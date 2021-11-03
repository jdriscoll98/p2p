//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Game {
    address[] bets;

    function addBet(address bet) public {
        bets.push(bet);
    }

    function getBets() public view returns (address[] memory) {
        return bets;
    }
}
