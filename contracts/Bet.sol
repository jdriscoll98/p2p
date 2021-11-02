//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Bet {
    // create a variable to store two addresses
    address payable public player1;
    address payable public player2;

    // create a variable to store the bet amount
    uint256 public betAmount;

    constructor() payable {
        player1 = payable(msg.sender);
        // set the bet amount to the value of the message
        betAmount = msg.value;
    }

    function acceptBet() public payable {
        // set the player2 variable to the address of the sender
        player2 = payable(msg.sender);
        betAmount += msg.value;
    }

    event Winner(address winner);

    // pick player1 or player 2 randomly to determine the winnner
    function pickWinner() public {
        // Either 0 or 1
        uint256 randomNumber = uint256(
            keccak256(abi.encodePacked(block.timestamp))
        ) % 2;
        // if the random number is less than 0.5 then player1 wins
        if (randomNumber < uint256(1)) {
            // send the bet amount to player1
            player1.transfer(betAmount);
            emit Winner(player1);
        } else {
            // send the bet amount to player2
            player2.transfer(betAmount);
            console.log("Player 2 wins!");
            emit Winner(player2);
        }
    }
}
