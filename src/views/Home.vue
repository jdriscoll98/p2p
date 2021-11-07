<template>
  <div class="home">
    <div @click="spinCoin" class="coin" id="coin"></div>
  </div>

  <div class="featured">
    <h1>Featured Games</h1>
  </div>
  <GameCard :key="game.address" v-for="game in games" :title="'Coin Flip'" />
</template>

<script>
import { ref } from "vue";
// @ is an alias to /src
import GameCard from "@/components/GameCard.vue";
import useSpinningCoin from "@/composables/useSpinningCoin";

export default {
  name: "Home",
  components: {
    GameCard,
  },
  setup() {
    const games = ref([]);

    const { spinCoin } = useSpinningCoin();
    return {
      games,
      spinCoin,
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