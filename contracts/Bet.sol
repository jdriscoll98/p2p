//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Bet {

    address payable public creator;
    address payable public acceptor;

    int8 public choice;
    uint256 public betAmount;

    int8 public winnerChoice;

    constructor(int8 _choice, uint256 _betAmount) payable {
        maker = payable(msg.sender);
        choice = _choice;
        betAmount = _betAmount;

        taker = address(0);
        winnerChoice = -1;
    }

    function acceptBet() public payable {
        taker = payable(msg.sender);
    }

    function resolve(string _winnerChoice) public  {
        winnerChoice = _winnerChoice;
    }

    function isOpen() public returns (boolean) {
        return acceptor == address(0);
    }

    function isResolved() public returns (boolean) {
        return winnerChoice != -1;
    }
    
}
