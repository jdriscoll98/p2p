const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Platform", async () => {
  let platform;

  before(async () => {
    const platformFactory = await ethers.getContractFactory("Platform");
    platform = await platformFactory.deploy();
  });

  it("should deploy the Platform contract", async function () {
    expect(platform.address.length).to.be.equal(42);
  });

  it("should be able to add a game to the platform", async () => {
    await platform.registerGame("Hello, world");
    const gameAddress = await platform.games(0);
    const gameFactory = await ethers.getContractFactory("Game");
    const game = await gameFactory.attach(gameAddress);
    const [address, bets, name] = await game.getGame();
    expect(name).to.be.equal("Hello, world");
  });
});
