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
    const gameFactory = await ethers.getContractFactory("Game");
    const game = await gameFactory.deploy(platform.address);
    const gameAddress = await platform.games(0);
    expect(gameAddress).to.be.equal(game.address);
  });
});
