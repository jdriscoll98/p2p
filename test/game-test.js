const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Game", async () => {
  let game;

  before(async () => {
    // Deploy the contract
    const platformFactory = await ethers.getContractFactory("Platform");
    const platform = await platformFactory.deploy();
    const contractFactory = await ethers.getContractFactory("Game");
    game = await contractFactory.deploy(platform.address);
  });

  it("should deploy a new Game contract", async () => {
    expect(game.address).to.exist;
  });

  it("should be able to add a bet to a Game contract", async () => {
    const contractFactory = await ethers.getContractFactory("Bet");
    const bet = await contractFactory.deploy(game.address, {
      value: ethers.utils.parseEther("1"),
    });
    await game.addBet(bet.address);
    const bets = await game.getBets();
    expect(bets[0]).to.equal(bet.address);
  });
});
