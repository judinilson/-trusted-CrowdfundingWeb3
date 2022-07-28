import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import "@nomiclabs/hardhat-etherscan";

const dotenv = require("dotenv");
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    rinkeby: {
      url: process.env.RINKEBY_NETWORK_URL,
      accounts: [`${process.env.ACCOUNT_PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: process.env.API_KEY,
  },
};

export default config;
