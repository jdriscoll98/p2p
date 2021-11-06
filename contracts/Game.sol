//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Bet.sol";

contract Game {
    string name;
    address public gameAddress;
    Bet[] bets;

    constructor(string memory _name) {
        name = _name;
    }

    function addBet(int8 choice, uint8 amount) public returns (Bet) {
        address payable creator = payable(msg.sender);
        Bet bet = new Bet(creator, choice, amount);
        bets.push(bet);
        return bet;
    }

    function resolveBet(Bet bet) public {
        uint256 randomNumber = uint256(
            keccak256(abi.encodePacked(block.timestamp))
        ) % 2;
        Bet.Choice correctChoice = randomNumber < uint256(1) ? Bet.Choice.First : Bet.Choice.Second;
        bet.resolve(correctChoice);
    }
}