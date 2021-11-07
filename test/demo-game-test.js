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
    const bets = await game.getBets();
    expect(bets[0]).to.equal(bet.address);
  });

  it("should return the correct owner", async () => {
    const gameOwner = await game.getOwner();
    const [owner] = await ethers.getSigners();
    expect(gameOwner).to.equal(owner.address);
  });

  it("should return the full game data", async () => {
    const [gameAddress, bets, name] = await game.getGame();
    expect(gameAddress).to.equal(game.address);
    const gameBets = await game.getBets();
    expect(bets[0]).to.equal(gameBets[0]);
    const gameName = await game.name();
    expect(name).to.equal(gameName);
  });
});
