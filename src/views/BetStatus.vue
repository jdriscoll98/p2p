<template>
  <div class="bet-status-page">
    <div class="coin" id="coin"></div>
    <h1>Coin flipping in progress!</h1>
    <button class="action-btn accept" @click="seeYourBets()">
      See all your bets
    </button>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  name: "BetStatus",
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

    const seeYourBets = () => {
      this.$router.push("/bets");
    };

    onMounted(() => {
      spinCoin();
      setInterval(spinCoin, 3000);
    });

    return {
      seeYourBets,
      spinCoin,
    };
  },
};
</script>

<style>
.bet-status-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>