<template>
  <div class="game-page">
    <h1>{{ title }}</h1>
    <div class="action">
      <strong>New bet</strong>
      <i class="pi pi-plus-circle"></i>
    </div>
    <div class="available">
      <h3>Available Bets</h3>
      <div @click="openBet" class="bet">
        <div class="bet-address">
          <span>0x00000</span>
        </div>
        <div class="bet-choice">
          <span>Heads</span>
        </div>
        <div class="bet-wager">
          <span>1 ETH</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "Game",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const title = ref(route.params.title);

    const openBet = () => {
      router.push(`/games/${title.value}/bets/bet1/`);
    };
    return {
      openBet,
      title,
    };
  },
};
</script>

<style>
.game-page {
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.action {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.pi-plus-circle {
  margin: 1rem;
  font-size: 1.5rem;
  color: green;
}

.bet {
  display: flex;
  margin: 1rem;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  height: 4rem;
  color: black;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
}
</style>