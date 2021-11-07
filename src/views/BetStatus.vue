<template>
  <div class="bet-status-page">
    <template v-if="status === 'pending'">
      <div class="coin" id="coin"></div>
      <h1>Coin flipping in progress!</h1>
      <button class="action-btn accept" @click="seeYourBets()">
        See all your bets
      </button>
    </template>
    <template v-else-if="status === 'won'">
      <div class="result won">
        <div class="result-title">You won!</div>
        <img src="../assets/trophy.png" />
        <div class="amount">1 ETH</div>
        <button class="go-back-btn" @click="seeYourBets">
          See All Your Bets
        </button>
      </div>
    </template>
    <template v-else>
      <div class="result lost">
        <div class="result-title">You lost!</div>
        <img height="200" src="../assets/odd.png" />
        <div class="amount">1 ETH</div>
        <button class="go-back-btn" @click="seeYourBets">
          See All Your Bets
        </button>
      </div>
    </template>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import useSpinningCoin from "@/composables/useSpinningCoin";
import JSConfetti from "js-confetti";

export default {
  name: "BetStatus",
  setup() {
    const router = useRouter();
    const { spinCoin } = useSpinningCoin();

    const seeYourBets = () => {
      router.push("/bets");
    };

    const status = ref("pending");

    onMounted(() => {
      setInterval(spinCoin, 1000);
      setTimeout(() => {
        // pick a random number between 0 and 1
        const random = Math.random();
        if (random < 0.5) {
          status.value = "won";
          const jsConfetti = new JSConfetti();
          jsConfetti.addConfetti({
            colors: ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5"],
            confettiRadius: 10,
            confettiNumber: 500,
          });
        } else {
          status.value = "lost";
        }
      }, 2000);
    });

    return {
      seeYourBets,
      status,
      spinCoin,
    };
  },
};
</script>

<style>
.bet-status-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.go-back-btn {
  width: 100%;
  height: 60px;
  background-color: #3f51b5;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  position: absolute;
  bottom: 0;
  left: 0;
}

.result {
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 5rem;
}

.lost {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.amount {
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
}
</style>