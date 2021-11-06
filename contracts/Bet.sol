//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Bet {
    enum Choice {
        None,
        First,
        Second
    }

    address payable public creator;
    address payable public acceptor;

    int8 public choice;
    uint256 public betAmount;

    Choice public winnerChoice;

    constructor(address payable _creator, int8 _choice, uint256 _betAmount) payable {
        creator = _creator;
        choice = _choice;
        betAmount = _betAmount;

        acceptor = payable(0);
        winnerChoice = Choice.None;
    }

    function acceptBet() public payable {
        acceptor = payable(msg.sender);
    }

    function resolve(Choice _winnerChoice) public  {
        winnerChoice = _winnerChoice;
    }

    function isOpen() view public returns (bool) {
        return acceptor == address(0);
    }

    function isResolved() view public returns (bool) {
        return winnerChoice != Choice.None;
    }
}
