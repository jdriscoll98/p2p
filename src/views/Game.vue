<template>
  <div class="game-page">
    <h1>{{ game?.title }}</h1>
    <div class="action">
      <h3>New bet</h3>
      <i @click="newBet" class="pi pi-plus-circle"></i>
    </div>
    <h2>Available Bets</h2>

    <div class="available">
      <BetCard v-for="bet in game?.bets" :key="bet?.betAddress" @click="viewBet(bet?.betAddress)" :address="bet?.betAddress" :amount="bet.amountInEth" :choice="bet.gameChoice" />
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import BetCard from "@/components/BetCard.vue";

import useGame from "@/composables/useGame";

export default {
  name: "Game",
  components: { BetCard },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const viewBet = (bet) => {
      router.push(`/games/${route.params.address}/bets/${bet}/`);
    };

    const newBet = () => {
      router.push(`/games/${route.params.address}/newbet/`);
    };

    const { game } = useGame(route.params.address);

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