//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Platform.sol";
import "./Bet.sol";

contract Game {
    event BetCreated(address bet);
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
        Bet bet = (new Bet){value: msg.value}(choice, msg.sender);
        bets.push(bet);
        emit BetCreated(address(bet));
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

    // function resolve() public {
    //     uint256 randomNumber = uint256(
    //         keccak256(abi.encodePacked(block.timestamp))
    //     ) % 2;
    //     // if the random number is less than 0.5 then player1 wins
    //     if (randomNumber < uint256(1)) {
    //         // send the bet amount to player1
    //         player1.transfer(betAmount);
    //         emit Winner(player1);
    //     } else {
    //         // send the bet amount to player2
    //         player2.transfer(betAmount);
    //         console.log("Player 2 wins!");
    //         emit Winner(player2);
    //     }
    // }
}
