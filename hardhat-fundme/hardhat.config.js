require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({path: ".env"});
require("hardhat-deploy");
require("hardhat-gas-reporter")
require("@nomiclabs/hardhat-etherscan")

/** @type import('hardhat/config').HardhatUserConfig */

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
module.exports = {
  defaultNetwork : "hardhat",
  solidity: {
    compilers : [
      {version : "0.8.8"},
      {version : "0.6.6"}
    ]
  },
  networks : {
    goerli : {
      url : GOERLI_RPC_URL,
      accounts : [PRIVATE_KEY],
      chainId : 5,
      blockConfirmations: 6
    }
  },
  etherscan : {
    apiKey : ETHERSCAN_API_KEY
  },
  namedAccounts : {
    deployer : {
      default : 0,
      1 : 0
    }
  }
};
