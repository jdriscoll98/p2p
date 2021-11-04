//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Platform.sol";

contract Game {
    Platform public platform;
    address[] bets;

    constructor(address platformAddress) {
        platform = Platform(platformAddress);
        platform.registerGame(address(this));
    }

    function addBet(address bet) external {
        bets.push(bet);
    }

    function getBets() public view returns (address[] memory) {
        return bets;
    }
}
