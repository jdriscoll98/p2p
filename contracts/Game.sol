//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Platform.sol";

contract Game {
    string public name;
    address[] bets;
    address owner;

    constructor(string memory _name) {
        name = _name;
        owner = msg.sender;
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
            string memory
        )
    {
        return (address(this), bets, name);
    }
}
