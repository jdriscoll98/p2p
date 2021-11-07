// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./Game.sol";

contract Platform {
    Game[] public games;

    // @notice Register a game
    function registerGame(string memory name) public {
        Game game = new Game(name);
        games.push(game);
    }

    // return all games
    function getGames() public view returns (Game[] memory) {
        return games;
    }
}
