import { Signer } from "ethers";
import { ethers } from "hardhat";
import * as typechain from "../typechain";

async function deployContract(
  contractName: string,
  constructorArgs: any[],
  signer: Signer
) {
  const factory = await ethers.getContractFactory(contractName);
  const contract = await factory.deploy(constructorArgs);
}

async function main() {
  const factory = await ethers.getContractFactory("CarbonCredit");
  const contract = await factory.deploy();
  await contract.deployed();
  return contract;
}

main()
  .then((contract) => {
    console.log("Deployed to %s", contract.address);
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
