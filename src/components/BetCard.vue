<template>
  <div class="bet">
    <div class="bet-address">
      <div class="label">Address</div>
      <div>0x000000..</div>
    </div>
    <div class="bet-choice">
      <div class="label">Choice</div>
      <div>Heads</div>
    </div>
    <div class="bet-wager">
      <div class="label">Wager</div>
      <div>1 ETH</div>
    </div>
  </div>
</template>

<script>
export default {};
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

.label {
  font-size: 0.8rem;
  font-weight: bold;
  margin-right: 0.5rem;
}
</style>