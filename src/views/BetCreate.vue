<template>
  <div class="create-page">
    <h1 class="game-title">{{ game?.title }} - New Bet</h1>
    <h3>Bet Amount</h3>
    <div class="input-control">
      <input
        type="number"
        class="form-control"
        id="bet-title"
        v-model="betAmount"
      />
      <div class="unit">ETH</div>
    </div>
    <h3>Bet Choice</h3>
    <div class="button-group">
      <button data-choice="Heads" @click="choose(0)" class="selected">
        Heads
      </button>
      <button data-choice="Tails" @click="choose(1)">Tails</button>
      <button data-choice="Random" @click="choose(2)">I'm Feeling Lucky</button>
    </div>
    <div class="bet-preview">
      <h3>Bet Preview</h3>
      <div class="preview-group">
        <div class="preview-item">
          <div class="preview-title">Bet Amount</div>
          <div class="preview-value">{{ betAmount }}</div>
        </div>
        <div class="preview-item">
          <div class="preview-title">Bet Choice</div>
          <div class="preview-value">{{ betChoice }}</div>
        </div>
      </div>
    </div>
    <div class="action-button-container">
      <button class="action-btn accept" @click="createBet">Create Bet</button>
      <button class="action-btn back" @click="goBack">Cancel</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import useGame from "../composables/useGame";
export default {
  name: "BetCreate",
  setup() {
    const route = useRoute();
    const router = useRouter();

    const betAmount = ref(0);
    const betChoice = ref("Heads");

    const { game } = useGame(route.params.address);

    const choices = ["Heads", "Tails", "I'm Feeling Lucky"];
    const choose = (choice) => {
      const prevChoiceBtn = document.querySelector(".selected");
      if (prevChoiceBtn) {
        prevChoiceBtn.classList.remove("selected");
      }

      if (choice == 0 || choice == 1) {
        betChoice.value = choices[choice];
      } else {
        betChoice.value = "Random";
      }

      const choiceBtn = document.querySelector(
        `.button-group button[data-choice="${betChoice.value}"]`
      );
      choiceBtn?.classList.add("selected");
    };

    const createBet = () => {
      router.push("/games/coinflip/bets/bet1/status");
    };

    const goBack = () => {
      router.push("/games/coinflip/");
    };

    return {
      choose,
      betAmount,
      betChoice,
      goBack,
      createBet,
      game,
    };
  },
};
</script>

<style>
.preview-group {
  display: flex;
  flex-direction: column;
  border: 1px solid black;
}

.preview-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid black;
  padding: 10px;
}

.preview-title {
  font-weight: bold;
}

.game-title {
  margin-bottom: 1rem;
}
.action-button-container {
  display: flex;
  flex-direction: column;
}
.create-page {
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: space-around;
}

.form-control {
  width: 100%;
  margin: 1rem 1rem 1rem 0;
  height: 3rem;
  border-radius: 0.25rem;
  padding-left: 1rem;
  border: 1px solid #ccc;
  box-shadow: 0 0 0.25rem 0 rgba(0, 0, 0, 0.25);
}

.button-group {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.button-group button {
  border-radius: 0;
  height: 4rem;
  width: 33%;
  margin: 1rem 0.25rem 1rem 0;
  font-size: 1.25rem;
  color: white;
  border: none;
  background-color: #00a8ff;
}

.button-group button.selected {
  background-color: #0359f8;
}
.input-control {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>