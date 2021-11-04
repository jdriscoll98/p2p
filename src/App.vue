<template>
  <h1 style="color: red" v-if="!connectedToEthereum">
    You need MetaMask to use this application
  </h1>
  <h1>Jack's First P2P Blockchain Betting Application</h1>
  <img width="100" src="./assets/coin.svg" />
  <h3>Your address: {{ address }}</h3>
  <h4>Input Platform Address</h4>
  <p>
    <input v-model="platformAddress" />
    <button @click="joinPlatform">Join Platform</button>
  </p>
  <p v-if="platformError" style="color: red">{{ platformError }}</p>

  <template v-if="connectedToPlatform">
    <hr style="width: 100%; margin-block: 1rem" />
    <h1>Connected to platform: {{ currentPlatform }}</h1>
    <p>
      <button @click="createGame">Create Game</button>
    </p>

    <h3>Current Games</h3>
    <template :key="game" v-for="game in games"> {{ game }} <br /> </template>
  </template>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import { ethers } from "ethers";
// import Bet from "../artifacts/contracts/Bet.sol/Bet.json";
import Game from "../artifacts/contracts/Game.sol/Game.json";
import Platform from "../artifacts/contracts/Platform.sol/Platform.json";

export default {
  name: "App",
  setup() {
    const connectedToEthereum = ref(false);

    const platformAddress = ref("0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"); // Default Platform
    const currentPlatform = ref("");
    const platformError = ref("");
    const connectedToPlatform = ref(false);

    const games = ref([]);

    watch(currentPlatform, async () => {
      if (!currentPlatform.value) {
        games.value = [];
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        currentPlatform.value,
        Platform.abi,
        provider
      );

      games.value = await contract.getGames();
    });

    const createGame = async () => {
      if (!currentPlatform.value) {
        return;
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      // create a game factory
      const gameFactory = new ethers.ContractFactory(
        Game.abi,
        Game.bytecode,
        signer
      );
      await gameFactory.deploy(currentPlatform.value);

      // connect to the platform
      const contract = new ethers.Contract(
        currentPlatform.value,
        Platform.abi,
        signer
      );
      // get the games from the platform
      games.value = await contract.getGames();
    };
    const bet = ref(0);
    const betError = ref("");
    const bets = ref([]);

    const address = ref("");

    const joinPlatform = async () => {
      if (!connectedToEthereum.value) {
        return;
      }
      if (!platformAddress.value) {
        return;
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      // get contract at gameAddress
      try {
        const PlatformContract = new ethers.Contract(
          platformAddress.value,
          Platform.abi,
          signer
        );
        const resolvedAddress = await PlatformContract.resolvedAddress;
        if (resolvedAddress.includes("Error")) {
          throw new Error(resolvedAddress);
        }
        currentPlatform.value = resolvedAddress;
        connectedToPlatform.value = true;
        platformError.value = "";
        platformAddress.value = "";
      } catch {
        platformError.value = "Could not connect to platform";
        if (!platformError.value) {
          platformError.value = false;
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
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        address.value = await signer.getAddress();
        joinPlatform();
      } catch (error) {
        connectedToEthereum.value = false;
      }
    });

    return {
      connectedToEthereum,

      bet,
      betError,
      bets,
      address,

      platformAddress,
      currentPlatform,
      connectedToPlatform,
      platformError,
      joinPlatform,

      games,
      createGame,
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