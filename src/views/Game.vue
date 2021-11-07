<template>
  <div class="game-page">
    <h1>{{ game?.title }}</h1>
    <div class="action">
      <h3>New bet</h3>
      <i @click="newBet(address)" class="pi pi-plus-circle"></i>
    </div>
    <h2>Available Bets</h2>

    <div class="available">
      <BetCard v-for="bet in game.bets" :key="bet" @click="viewBet" />
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import BetCard from "@/components/BetCard.vue";

import useEthereum from "@/composables/useEthereum";

import Game from "../../artifacts/contracts/Game.sol/Game.json";

import { ethers } from "ethers";

export default {
  name: "Game",
  components: { BetCard },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const viewBet = () => {
      router.push(`/games/${route.params.address}/bets/bet1/`);
    };

    const newBet = () => {
      router.push(`/games/${route.params.address}/newbet/`);
    };

    const { connectedToEthereum, connectToEthereum, getProvider } =
      useEthereum();

    const game = ref(null);
    onMounted(async () => {
      if (!connectedToEthereum.value) {
        await connectToEthereum();
      }

      const provider = getProvider();

      const gameContract = new ethers.Contract(
        route.params.address,
        Game.abi,
        provider
      );
      const [address, bets, title] = await gameContract.getGame();
      game.value = { address, bets, title };
    });

    return {
      viewBet,
      newBet,
      game,
    };
  },
};
</script>

<style>
.game-page {
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.action {
  display: flex;
  margin: 1rem 0;
  justify-content: flex-start;
  align-items: center;
}

.pi-plus-circle {
  margin: 0 1rem;
  font-size: 1.75rem;
  color: green;
}

.available {
  height: 100%;
  overflow: scroll;
  padding-bottom: 8rem;
}
</style>