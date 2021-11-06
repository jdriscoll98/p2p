// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Platform {
    address[] public games;

    // @notice Register a game
    function registerGame(address game) public {
        games.push(game);
    }

    // return all games
    function getGames() public view returns (address[] memory) {
        return games;
    }
}
