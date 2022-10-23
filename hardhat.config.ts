import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    goreli: {
      url: "https://goerli.infura.io/v3/ae1f6a17f60d4028be9f3d3466addcba",
      accounts:
        ["a3d69876b458baa9945206c3d6f1b95c74a55d46822144115fb3a2df06cc8ecb"],
    },
  },


  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  paths: {
    tests: "./test",
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
  },
  typechain: {
    outDir: "./typechain/",
  },
};

export default config;
