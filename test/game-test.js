const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Game", async () => {
  let contract;

  beforeEach(async () => {
    // Deploy the contract
    const contractFactory = await ethers.getContractFactory("Game");
    contract = await contractFactory.deploy();
  });

  it("should deploy a new Game contract", async () => {
    expect(contract.address).to.exist;
  });

  it("should be able to add a bet to a Game contract", async () => {
    const contractFactory = await ethers.getContractFactory("Bet");
    const bet = await contractFactory.deploy({
      value: ethers.utils.parseEther("1"),
    });
    await contract.addBet(bet.address);
    const bets = await contract.getBets();
    expect(bets[0]).to.equal(bet.address);
  });
});
