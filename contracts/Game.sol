//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Platform.sol";

contract Game {
    Platform public platform;
    // todo change to "bet" struct
    address[] bets;
    address owner;

    constructor(address platformAddress) {
        owner = msg.sender;
        platform = Platform(platformAddress);
        platform.registerGame(address(this));
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function addBet(address bet) external {
        bets.push(bet);
    }

    function getBets() public view returns (address[] memory) {
        return bets;
    }

    function getGame()
        public
        view
        returns (
            address,
            address[] memory,
            address
        )
    {
        return (address(this), bets, owner);
    }
}
