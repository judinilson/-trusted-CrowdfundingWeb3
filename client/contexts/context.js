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
const Web3 = require("web3");
let web3;
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
      const campaign = new web3.eth.Contract(
        contractCampaignABI,
        CampaignContractAddress
      ); //await getCampainContract(campaignId);
      const summaryResponse = await campaign.methods.getSummary().call();
      const [
        manager,
        balance,
        minimumContribution,
        requestCount,
        contributorsCount,
      ] = [
        String(summaryResponse[0]),
        String(web3.utils.fromWei(summaryResponse[1], "ether")),
        String(web3.utils.fromWei(summaryResponse[2], "ether")),
        +String(summaryResponse[3]),
        +String(summaryResponse[4]),
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

        return;
      }
    } catch (error) {
      console.log("error getting summaryResponse", error);

      return;
    }
  };

  const contribute = async (amount, campaignId) => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const providerAccount = provider.getSigner();
      const account = await providerAccount.getAddress();

      if (!account) {
        throw new Error("Please log into your MetaMask account");
      }
      const campaign = new web3.eth.Contract(
        contractCampaignABI,
        CampaignContractAddress
      ); //await getCampainContract(campaignId);

      const contribution = await campaign.methods.contribute().send({
        from: account,
        value: web3.utils.toWei(amount, "ether"),
        gas: "0x7EF40",
      });

      console.log("successfully contributed");
      return true;
    } catch (error) {
      // @ts-ignore

      console.error(`error contributing:${error.message}`);

      return false;
    }
  };

  /**
   * Create user profile in Sanity if doesnt exist
   */
  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    web3 = new Web3(provider.provider);
    window.ethereum.on("accountsChanged", () => {
      window.location.reload();
    });
    //console.log(web3);
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

        contribute,
      }}
    >
      {children}
    </CustomContext.Provider>
  );
};
