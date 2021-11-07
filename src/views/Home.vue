<template>
  <template v-if="connectedToEthereum">
    <div class="home">
      <div @click="spinCoin" class="coin" id="coin"></div>
    </div>

    <div class="featured">
      <h1>Featured Games</h1>
    </div>
    <GameCard
      :key="game.address"
      v-for="game in games"
      :address="game.address"
      :title="game.title"
    />
  </template>
</template>

<script>
import { onMounted, ref } from "vue";
// @ is an alias to /src
import GameCard from "@/components/GameCard.vue";
import useSpinningCoin from "@/composables/useSpinningCoin";
import useEthereum from "@/composables/useEthereum";

import Platform from "../../artifacts/contracts/Platform.sol/Platform.json";
import Game from "../../artifacts/contracts/Game.sol/Game.json";

import { ethers } from "ethers";
export default {
  name: "Home",
  components: {
    GameCard,
  },
  setup() {
    const { spinCoin } = useSpinningCoin();
    const { PLATFORM_ADDRESS, connectedToEthereum, getProvider } =
      useEthereum();

    const games = ref([]);
    const updateGames = (newGames) => {
      games.value = newGames;
    };

    onMounted(async () => {
      if (connectedToEthereum) {
        const provider = await getProvider();
        const contract = new ethers.Contract(
          PLATFORM_ADDRESS,
          Platform.abi,
          provider
        );
        const gameAddresses = await contract.getGames();
        const promises = await gameAddresses.map(async (gameAddress) => {
          const game = new ethers.Contract(gameAddress, Game.abi, provider);
          const [address, bets, name] = await game.getGame();
          return { address, bets, name };
        });
        updateGames(await Promise.all(promises));
      }
    });

    return {
      games,
      spinCoin,
      connectedToEthereum,
    };
  },
};
</script>


<style>
body {
  -webkit-transform: perspective(500px);
  -webkit-transform-style: preserve-3d;
}

.coin {
  background-image: url("http://coins.thefuntimesguide.com/images/blogs/presidential-dollar-coin-reverse-statue-of-liberty-public-domain.png");
  background-size: 100% 100%;
  border-radius: 100%;
  height: 100px;
  margin: 50px auto;
  position: relative;
  width: 100px;
  -webkit-transition: 4s linear;
  -webkit-transform-style: preserve-3d;
}

.featured {
  width: 100%;
  padding-inline: 1rem;
  display: flex;
  justify-content: flex-start;
}
</style>