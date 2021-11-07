<template>
  <div class="bet-page">
    <h1 class="bet-heading">Coin Flip</h1>
    <h3>Opponent's Bet</h3>
    <div class="bet">
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
    <h3>Your Bet</h3>
    <div class="bet">
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
    <div class="action-buttons">
      <button @click="acceptBet" class="action-btn accept">Accept</button>
      <button @click="goBack" class="action-btn back">Go Back</button>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  name: "Bet",
  setup() {
    const router = useRouter();

    const goBack = () => {
      router.push("/games/coinflip");
    };

    const acceptBet = () => {
      router.push("/games/coinflip/bets/bet1/status");
    };

    return {
      goBack,
      acceptBet,
    };
  },
};
</script>

<style>
.bet-page {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  padding: 2rem 1rem;
}

.bet-heading {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.action-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
}

.action-btn {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: #333;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  margin: 1rem 0;
  padding: 0.5rem 3rem;
}

.action-btn.accept {
  background-color: green;
  color: #fff;
}

.action-btn.back {
  background-color: red;
  color: #fff;
}
</style>