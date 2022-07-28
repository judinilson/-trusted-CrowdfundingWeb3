import { ethers } from "ethers";
import React, { useEffect, useState } from "react";

export const CustomContext = React.createContext(0);

let eth;

if (typeof window !== "undefined") {
  eth = window.ethereum;
}

export const CustomProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();
  const [isLoading, setIsLoading] = useState(false);
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
      if (!metamask) return alert("Please install metamask ");

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

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  return (
    <CustomContext.Provider
      value={{
        connectWallet,
        currentAccount,

        isLoading,
      }}
    >
      {children}
    </CustomContext.Provider>
  );
};
