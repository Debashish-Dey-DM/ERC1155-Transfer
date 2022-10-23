import { expect } from "chai";
import { ethers } from "hardhat";
import { factories, Test } from "../typechain";

describe("Test", function () {
  let contract: Test;
  let owner: string;
  it("Should work", async function () {
    const accounts = await ethers.getSigners();
    const factory = await ethers.getContractFactory("CarbonCredit");
    const contract = await factory.connect(accounts[0]).deploy();
    await contract.deployed();

    const createCreator = await contract.connect(accounts[0]).createCreditor(accounts[1].address);
    await createCreator.wait();
    const isCreditor = await contract.creditCreators(accounts[1].address);
    expect(isCreditor).to.equal(true);
    const mintCredit = await contract.connect(accounts[1]).mint(1000, "abc.com");
    await mintCredit.wait();
    const balance = await contract.balanceOf(accounts[1].address, 1);
    expect(Number(balance)).to.equal(1000);
    const transferCredit = await contract.connect(accounts[1]).safeTransferFrom(accounts[1].address, accounts[2].address, 1, 400, "0x");
    await transferCredit.wait();
    const balance2 = await contract.balanceOf(accounts[2].address, 1);
    expect(Number(balance2)).to.equal(400);
    const balance3 = await contract.balanceOf(accounts[1].address, 1);
    expect(Number(balance3)).to.equal(600);
  });

});
