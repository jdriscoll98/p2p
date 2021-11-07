//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Platform.sol";
import "./Bet.sol";

contract Game {
    string public name;
    Bet[] bets;
    address owner;

    constructor(string memory _name) {
        name = _name;
        owner = msg.sender;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function addBet(uint256 choice) public payable {
        Bet bet = new Bet(msg.value, choice, msg.sender);
        bets.push(bet);
    }

    function getBets() public view returns (Bet[] memory) {
        return bets;
    }

    function getGame()
        public
        view
        returns (
            address,
            Bet[] memory,
            string memory
        )
    {
        return (address(this), bets, name);
    }
}
