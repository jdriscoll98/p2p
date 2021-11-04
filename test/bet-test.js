const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Bet", async () => {
  let game;

  before(async () => {
    const platformFactory = await ethers.getContractFactory("Platform");
    const platform = await platformFactory.deploy();
    const factory = await ethers.getContractFactory("Game");
    game = await factory.deploy(platform.address);
  });

  it("Should deploy a new Bet contract", async function () {
    const Bet = await ethers.getContractFactory("Bet");
    const contract = await Bet.deploy(game.address);
    await contract.deployed();
    // check that contract is deployed
    expect(contract.address).to.be.a("string");
  });

  it("should set player1 equal to sender address", async function () {
    const Bet = await ethers.getContractFactory("Bet");
    const contract = await Bet.deploy(game.address);
    await contract.deployed();
    const player1 = await contract.player1();
    // player 1 should equal first account address
    const [owner] = await ethers.getSigners();
    expect(player1).to.equal(owner.address);
  });

  it("should set the bet amount to be 0 ", async () => {
    const Bet = await ethers.getContractFactory("Bet");
    const contract = await Bet.deploy(game.address);
    await contract.deployed();
    const betAmount = await contract.betAmount();
    // bet amount should equal the value sent, 0 in this case.
    expect(betAmount).to.equal(0);
  });

  it("should set the bet amount to be 1 ETH ", async () => {
    const Bet = await ethers.getContractFactory("Bet");
    const contract = await Bet.deploy(
      game.address,

      {
        value: ethers.utils.parseEther("1"),
      }
    );
    await contract.deployed();
    const betAmount = await contract.betAmount();
    // bet amount should equal the value sent, 0 in this case.
    expect(betAmount).to.equal(ethers.utils.parseEther("1"));
  });

  it("should set player 2 and increase bet amount", async () => {
    const [owner, addr1] = await ethers.getSigners();

    const Bet = await ethers.getContractFactory("Bet");
    const contract = await Bet.deploy(game.address, {
      value: ethers.utils.parseEther("1"),
    });
    await contract.deployed();

    await contract
      .connect(addr1)
      .acceptBet({ value: ethers.utils.parseEther("1") });

    const player2 = await contract.player2();
    // player 2 should equal the address sent
    expect(player2).to.equal(addr1.address);

    const betAmount = await contract.connect(owner).betAmount();
    expect(betAmount).to.equal(ethers.utils.parseEther("2"));
  });

  it("should pick a winner and transfer funds", async () => {
    const [owner, addr1] = await ethers.getSigners();

    // get balance of owner
    const originalBalance = await ethers.provider.getBalance(owner.address);
    // get balance of addr1

    const Bet = await ethers.getContractFactory("Bet");
    const contract = await Bet.deploy(game.address, {
      value: ethers.utils.parseEther("1"),
    });
    await contract.deployed();

    await contract
      .connect(addr1)
      .acceptBet({ value: ethers.utils.parseEther("1") });

    const winnerTx = await contract.connect(addr1).pickWinner();
    await expect(winnerTx).to.emit(contract, "Winner");

    // get return value from winnerTx

    // get balance of owner
    const balance = await ethers.provider.getBalance(owner.address);
    const ethBalance = ethers.utils.formatEther(balance);
    // get balance of addr1

    // round eth balances to integer
    const balanceInt = parseInt(ethBalance);

    // round original balances to integer
    const originalBalanceInt = parseInt(
      ethers.utils.formatEther(originalBalance)
    );

    // check that the original balances are different by 1 eth
    expect(Math.abs(balanceInt - originalBalanceInt)).to.equal(1);
  });
});
