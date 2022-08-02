import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { client } from "../lib/sanityClient";
import {
  contractFactoryABI,
  CampaignFactoryContractAddress,
  contractCampaignABI,
  CampaignContractAddress,
} from "../lib/constants";
import { useRouter } from "next/router";

export const CustomContext = React.createContext(0);

let eth;

if (typeof window !== "undefined") {
  eth = window.ethereum;
}

const getCampainFactoryContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const CampaignFactoryContract = new ethers.Contract(
    CampaignFactoryContractAddress,
    contractFactoryABI,
    signer
  );

  return CampaignFactoryContract;
};
const getCampainContract = (campaignAddress) => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner(
    "0xfd4F5eAB629afAD02fC402E471d7e2Cb2b8af962"
  );

  const CampaignContract = new ethers.Contract(
    CampaignContractAddress,
    contractCampaignABI,
    signer
  );

  return CampaignContract;
};
const getWalletBalance = async (address) => {
  const provider = new ethers.providers.Web3Provider(ethereum);

  const balance = await provider.getBalance(String(address));

  return ethers.utils.formatEther(balance._hex).slice(0, 5);
};

export const CustomProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();
  const [responseType, setResponseType] = useState({
    success: false,
    error: false,
    message: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    minContribution: "",
    goal: "",
    cover: "",
    description: "",
  });
  //const router = useRouter();
  /**
   * Checks if MetaMask is installed and an account is connected
   * @param {*} metamask Injected MetaMask code from the browser
   * @returns
   */
  const checkIfWalletIsConnected = async (metamask = eth) => {
    try {
      if (!metamask) return alert("Please install metamask ");

      const accounts = await metamask.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      }
    } catch (error) {
      console.error(error);
      throw new Error("No ethereum object.");
    }
  };
  /**
   * Prompts user to connect their MetaMask wallet
   * @param {*} metamask Injected MetaMask code from the browser
   */
  const connectWallet = async (metamask = eth) => {
    try {
      if (!metamask) return window.alert("Please install metamask ");

      const accounts = await metamask.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
      window.alert("Please connect your MetaMask");
      //throw new Error("No ethereum object.");
    }
  };

  /**
   * save campaigns to sanityClient
   */
  const saveCampaign = async (
    txHash,
    name,
    minContribution,
    goal,
    cover,
    description
  ) => {
    const txDoc = {
      _type: "campaigns",
      _id: txHash,
      campaignName: name,
      miniumContribution: Number(minContribution),
      goalTarget: Number(goal),
      cover: cover,
      description: description,
      timestamp: new Date(Date.now()).toISOString(),
      txHash: txHash,
      creator: {
        _key: currentAccount,
        _ref: currentAccount,
        _type: "reference",
      },
    };
    await client.createIfNotExists(txDoc);
    await client
      .patch(currentAccount)
      .setIfMissing({ campaigns: [] })
      .insert("after", "campaigns[-1]", [
        {
          _key: txHash,
          _ref: txHash,
          _type: "reference",
        },
      ])
      .commit();
  };

  /**
   * Executes a Create Campaign
   * @param {*} metamask Injected MetaMask code from the browser
   * @param {string} currentAccount Current user's address
   */
  const createCampaign = async (
    metamask = eth,
    connectedAccount = currentAccount
  ) => {
    try {
      if (!metamask) return window.alert("Please install metamask ");
      const { name, minContribution, goal, cover, description } = formData;
      const campaignFactoryContract = getCampainFactoryContract();

      const parsedAmountMin = ethers.utils.parseEther(minContribution);
      console.log(parsedAmountMin);
      const campaignHash = await campaignFactoryContract.CreateCampaign(
        parsedAmountMin
      );

      await campaignHash.wait();

      await saveCampaign(
        campaignHash.hash,
        name,
        minContribution,
        goal,
        cover,
        description
      );
      setResponseType({
        success: true,
        message: "campaign successfully created",
      });
      console.log("campaign successfully created");
    } catch (error) {
      console.log(error.message);
      setResponseType({ error: true, message: error.message });
    }
  };

  /**
   * Get campaigns from sanity
   */
  const getCampaigns = async () => {
    // let campaignAddresses = [];
    // try {
    //   const campaignFactoryContract = getCampainContract();
    //   console.log(campaignFactoryContract);
    //   campaignAddresses = await campaignFactoryContract.getDeployedCampaigns();
    // } catch (error) {
    //   console.log(error.message);
    //   setResponseType({
    //     error: true,
    //     message: error.message,
    //   });
    //   return;
    //}
    //console.log(campaignAddresses);
    try {
      const query = `*[_type == "campaigns"  ] {
        
        "id":txHash,
        campaignName,
        miniumContribution,
        "goal":goalTarget,
        "urlCover":cover,
        description,
        "dateTime":timestamp,
        "creator":creator._ref
          }`;
      const campaignData = await client.fetch(query);

      //console.log(campaignData, "🔥");
      setResponseType({
        success: true,
        message: "successfully fetched",
      });
      return campaignData;
    } catch (error) {
      console.log(error.message);
      setResponseType({
        error: true,
        message: error.message,
      });
    }
  };

  /**
   * Get campaigns from sanity
   * @param {string} campaignId campaign id
   */
  const getCampaignById = async (campaignId) => {
    try {
      const campaign = await getCampainContract(campaignId);
      const summaryResponse = await campaign.getSummary();
      const [
        manager,
        balance,
        minimumContribution,
        requestCount,
        contributorsCount,
      ] = [
        String(summaryResponse[0]),
        ethers.utils.formatEther(String(summaryResponse[1]._hex)),
        ethers.utils.formatEther(String(summaryResponse[2]._hex)),
        +ethers.utils.formatEther(String(summaryResponse[3]._hex)),
        +ethers.utils.formatEther(String(summaryResponse[4]._hex)),
      ];
      try {
        const query = `*[_type == "campaigns"  && txHash == "${campaignId}" ] {
        
        "id":txHash,
        campaignName,
        miniumContribution,
        "goal":goalTarget,
        "urlCover":cover,
        description,
        "dateTime":timestamp,
        "creator":creator._ref
          }`;

        const data = await client.fetch(query);
        const campaignData = data[0];
        setResponseType({
          success: true,
          message: "successfully fetched",
        });

        const campaign = {
          id: campaignData.id,
          manager: manager,
          campaignName: campaignData.campaignName,
          describtion: campaignData.describtion,
          minimumContribution: minimumContribution,
          goal: campaignData.goal,
          balance: balance,
          cover: campaignData.urlCover,
          requestCount: requestCount,
          contributorsCount: contributorsCount,
          createdAt: campaignData.dateTime,
        };
        return campaign;
      } catch (error) {
        console.log(error.message);
        setResponseType({
          error: true,
          message: error.message,
        });
        return;
      }
    } catch (error) {
      console.log("error getting summaryResponse", error);
      setResponseType({
        error: true,
        message: error.message,
      });
      return;
    }
  };

  const contribute = async (amount, campaignId) => {
    setResponseType({
      error: false,
      success: false,
      message: undefined,
    });
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const account = provider.getSigner();

      if (!account) {
        throw new Error("Please log into your MetaMask account");
      }
      const campaign = await getCampainContract(campaignId);
      const parsedAmount = ethers.utils.parseEther(amount);
      await campaign
        .contribute()
        .send({ from: account, value: parsedAmount, gasLimit: 100000 });
      setResponseType({
        succes: true,
        message: "successfully contributed",
      });
      console.log("successfully contributed");
    } catch (error) {
      // @ts-ignore
      console.error(`error contributing:${error.message}`);
      return;
    }
  };
  /**
   * Create user profile in Sanity if doesnt exist
   */
  useEffect(() => {
    if (!currentAccount) return;
    (async () => {
      const userDoc = {
        _type: "users",
        _id: currentAccount,
        userName: `unamed`,
        address: currentAccount,
      };

      await client.createIfNotExists(userDoc);
    })();
  }, [currentAccount]);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  return (
    <CustomContext.Provider
      value={{
        connectWallet,
        currentAccount,
        createCampaign,
        responseType,
        formData,
        setFormData,
        getCampaigns,
        getCampaignById,
        getWalletBalance,
        contribute,
      }}
    >
      {children}
    </CustomContext.Provider>
  );
};
