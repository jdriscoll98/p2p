//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Game.sol";

contract Bet {
    // create a variable to store two addresses
    address payable public betor;
    address payable public betee;

    // create a variable to store the bet amount
    uint256 betorChoice;
    uint256 public betAmount;

    address public winner;

    constructor(
        uint256 amount,
        uint256 choice,
        address _betor
    ) payable {
        betor = payable(_betor);
        betorChoice = choice;
        // set the bet amount to the value of the message
        betAmount = amount;
    }

    function acceptBet() public payable {
        // set the player2 variable to the address of the sender
        betee = payable(msg.sender);
        betAmount += msg.value;
    }
}
