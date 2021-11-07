<template>
  <div class="bet">
    <div class="bet-address">
      <div class="label">Address</div>
      <div class="value">{{ address }}</div>
    </div>
    <div class="bet-choice">
      <div class="label">Choice</div>
      <div class="value">{{ choice }}</div>
    </div>
    <div class="bet-wager">
      <div class="label">Wager</div>
      <div class="value">{{ amount }} ETH</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BetCard",
  props: {
    address: {
      type: String
    },
    choice: {
      type: String,
    },
    amount: {
      type: String,
    }
  }
};
</script>

<style>
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

.bet-address {
  max-width: 33%;
}

.label {
  font-size: 0.8rem;
  font-weight: bold;
  margin-right: 0.5rem;
}

.value {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>