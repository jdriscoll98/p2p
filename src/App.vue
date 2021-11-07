<template>
  <Navbar />
  <router-view> </router-view>
</template>


<script>
import { onMounted, ref, watch } from "vue";
import { ethers } from "ethers";
import Bet from "../artifacts/contracts/Bet.sol/Bet.json";
import Game from "../artifacts/contracts/Game.sol/Game.json";
import Platform from "../artifacts/contracts/Platform.sol/Platform.json";

import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
  setup() {
    const connectedToEthereum = ref(false);
    const address = ref("");

    const platformAddress = ref("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"); // Default Platform
    const currentPlatform = ref("");
    const platformError = ref("");
    const connectedToPlatform = ref(false);

    const games = ref([]);

    watch(currentPlatform, async () => {
      if (!currentPlatform.value) {
        games.value = [];
      }
      games.value = await getAllGames();
    });

    const getBets = async (gameAddress) => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(gameAddress, Game.abi, provider);

      const bets = await contract.getBets();
      console.log(bets);
      return bets;
    };

    const newBet = async (gameAddress) => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const betFactory = new ethers.ContractFactory(
        Bet.abi,
        Bet.bytecode,
        signer
      );
      const bet = await betFactory.deploy(gameAddress, {
        value: ethers.utils.parseEther("1"),
      });
      await bet.deployed();

      const game = new ethers.Contract(gameAddress, Game.abi, provider);
      const bets = await game.getBets();
      games.value.find((game) => game.address === gameAddress).bets = bets;
    };

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
      const game = await gameFactory.deploy(currentPlatform.value);
      await game.deployed();

      games.value = await getAllGames();
    };

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

    async function getAllGames() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        currentPlatform.value,
        Platform.abi,
        provider
      );

      const gameAddresses = await contract.getGames();
      const promises = await gameAddresses.map(async (gameAddress) => {
        const game = new ethers.Contract(gameAddress, Game.abi, provider);
        const [address, bets, owner] = await game.getGame();
        return { address, bets, owner };
      });
      return await Promise.all(promises);
    }
    return {
      connectedToEthereum,
      address,

      platformAddress,
      currentPlatform,
      connectedToPlatform,
      platformError,
      joinPlatform,

      games,
      createGame,

      getBets,
      newBet,
    };
  },
};
</script>

<style>
* {
  margin: 0;
  box-sizing: border-box;
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