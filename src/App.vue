<template>
  <h1 style="color: red" v-if="!connectedToEthereum">
    You need MetaMask to use this application
  </h1>
  <h1>Jack's First P2P Blockchain Betting Application</h1>
  <img width="100" src="./assets/coin.svg" />
  <h3>Your address: {{ address }}</h3>
  <h4>Input Game Address</h4>
  <p>
    <input v-model="gameAddress" />
    <button @click="joinGame">Join Game</button>
  </p>
  <p v-if="gameError" style="color: red">{{ gameError }}</p>
  <strong>OR</strong>
  <h4>Create a new game</h4>
  <button @click="createGame">Create Game</button>

  <p v-if="betError" style="color: red">{{ betError }}</p>
  <template v-if="connectedToGame">
    <hr style="width: 100%; margin-block: 1rem" />
    <h1>Connected to game: {{ currentGame }}</h1>
    <p>Make a bet</p>
    <p>
      <input type="text" v-model="bet" />
      <label>ETH</label>
      <button @click="makeBet">Bet</button>
    </p>
    <h3>Current Bets</h3>
    <table>
      <thead>
        <tr>
          <th>Address</th>
          <th>Side</th>
          <th>Wage</th>
          <th>Result</th>
          <th>Accept?</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="bet" v-for="bet in bets">
          <td>{{ bet }}</td>
        </tr>
      </tbody>
    </table>
  </template>
</template>

<script>
import { onMounted, ref } from "vue";
import { ethers } from "ethers";
import Bet from "../artifacts/contracts/Bet.sol/Bet.json";
import Game from "../artifacts/contracts/Game.sol/Game.json";

export default {
  name: "App",
  setup() {
    const connectedToEthereum = ref(false);

    const gameAddress = ref("");
    const connectedToGame = ref(false);
    const gameError = ref("");
    const currentGame = ref("");

    const bet = ref(0);
    const betError = ref("");
    const bets = ref([]);

    const address = ref("");

    const makeBet = async () => {
      if (!connectedToEthereum.value) {
        return;
      }
      if (bet.value <= 0) {
        betError.value = "You cannot bet 0 ETH";
        return;
      }
      betError.value = "";

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const BetFactory = new ethers.ContractFactory(
        Bet.abi,
        Bet.bytecode,
        signer
      );
      const betContract = await BetFactory.deploy({
        value: ethers.utils.parseEther(bet.value),
      });
      await betContract.deployed();

      const GameContract = new ethers.Contract(
        currentGame.value,
        Game.abi,
        signer
      );
      await GameContract.addBet(betContract.address);
      // get bets from the contract
      bets.value = await GameContract.getBets();
      console.log(bets.value);
      bet.value = 0;
    };

    const joinGame = async () => {
      if (!connectedToEthereum.value) {
        return;
      }
      if (!gameAddress.value) {
        return;
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      // get contract at gameAddress
      try {
        const GameContract = new ethers.Contract(
          gameAddress.value,
          Game.abi,
          signer
        );
        // get bets from the contract
        const gameBets = await GameContract.getBets();
        bets.value = gameBets;
        connectedToGame.value = true;
        currentGame.value = GameContract.address;
        gameError.value = "";
        gameAddress.value = "";
      } catch {
        gameError.value = "Could not connect to game";
        if (!connectedToGame.value) {
          connectedToGame.value = false;
        }
      }
    };

    onMounted(async () => {
      if (!window.ethereum) {
        connectedToEthereum.value = false;
        return;
      }
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        connectedToEthereum.value = true;
      } catch (error) {
        connectedToEthereum.value = false;
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      address.value = await signer.getAddress();
    });

    return {
      bet,
      betError,
      bets,
      makeBet,
      connectedToEthereum,
      gameAddress,
      connectedToGame,
      joinGame,
      gameError,
      currentGame,
      address,
    };
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

html,
body {
  width: 100%;
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

table,
tr {
  border-collapse: collapse;
  border: 1px solid black;
  width: 100%;
}

th,
td {
  border: 1px solid black;
}
th {
  padding: 10px;
}
</style>