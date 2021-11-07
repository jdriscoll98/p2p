<template>
  <div class="home">
    <div @click="spinCoin" class="coin" id="coin"></div>
  </div>

  <div class="featured">
    <h1>Featured Games</h1>
  </div>

  <GameCard />
</template>

<script>
import { onMounted, ref } from "vue";
// @ is an alias to /src
import GameCard from "@/components/GameCard.vue";
export default {
  name: "Home",
  components: {
    GameCard,
  },
  setup() {
    const degrees = ref(0);
    const spinCoin = () => {
      const coin = document.getElementById("coin");
      if (!coin) return;
      degrees.value += 1800;
      coin.style.webkitTransform = "rotateY(" + degrees.value + "deg)";
      coin.style.MozTransform = "rotateY(" + degrees.value + "deg)";
      coin.style.msTransform = "rotateY(" + degrees.value + "deg)";
      coin.style.OTransform = "rotateY(" + degrees.value + "deg)";
      coin.style.transform = "rotateY(" + degrees.value + "deg)";
    };

    onMounted(() => {
      setInterval(spinCoin, 3000);
    });

    return {
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
  -webkit-transition: 2s linear;
  -webkit-transform-style: preserve-3d;
}

.featured {
  width: 100%;
  padding-inline: 1rem;
  display: flex;
  justify-content: start;
}
</style>