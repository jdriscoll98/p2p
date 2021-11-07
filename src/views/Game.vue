<template>
  <div class="game-page">
    <h1>{{ title }}</h1>
    <div class="action">
      <h3>New bet</h3>
      <i @click="newBet()" class="pi pi-plus-circle"></i>
    </div>
    <h2>Available Bets</h2>

    <div class="available">
      <BetCard @click="viewBet" />
      <BetCard @click="viewBet" />
      <BetCard @click="viewBet" />
      <BetCard @click="viewBet" />
      <BetCard @click="viewBet" />
      <BetCard @click="viewBet" />
      <BetCard @click="viewBet" />
      <BetCard @click="viewBet" />
      <BetCard @click="viewBet" />
      <BetCard @click="viewBet" />
      <BetCard @click="viewBet" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import BetCard from "@/components/BetCard.vue";

export default {
  name: "Game",
  components: { BetCard },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const title = ref(route.params.title);

    const viewBet = () => {
      router.push(`/games/${title.value}/bets/bet1/`);
    };

    const newBet = () => {
      router.push(`/games/${title.value}/newbet/`);
    };

    return {
      viewBet,
      newBet,
      title,
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