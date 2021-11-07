<template>
  <div class="history-page">
    <h1 class="history-title">Betting History</h1>
    <h3>Pending Bets</h3>
    <table class="history-table">
      <thead>
        <tr>
          <th>Game</th>
          <th>Amount</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Coin Flip</td>
          <td>1 ETH</td>
          <td>PENDING</td>
        </tr>
        <tr>
          <td>Coin Flip</td>
          <td>1 ETH</td>
          <td>PENDING</td>
        </tr>
        <tr>
          <td>Coin Flip</td>
          <td>1 ETH</td>
          <td>PENDING</td>
        </tr>
        <tr>
          <td>Coin Flip</td>
          <td>1 ETH</td>
          <td>PENDING</td>
        </tr>
      </tbody>
    </table>
    <h3>Completed Bets</h3>
    <table class="history-table">
      <thead>
        <tr>
          <th>Game</th>
          <th>Amount</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        <tr class="win">
          <td>Coin Flip</td>
          <td>1 ETH</td>
          <td>WIN</td>
        </tr>
        <tr class="win">
          <td>Coin Flip</td>
          <td>1 ETH</td>
          <td>WIN</td>
        </tr>
        <tr class="loss">
          <td>Coin Flip</td>
          <td>1 ETH</td>
          <td>LOSS</td>
        </tr>
        <tr class="win">
          <td>Coin Flip</td>
          <td>1 ETH</td>
          <td>WIN</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {};
</script>

<style>
.history-page {
  width: 100%;
  padding: 2rem 1rem;
}

.history-title {
  margin-bottom: 1rem;
}

.history-table {
  width: 100%;
  margin: 1rem 0;
}

.history-table tr td {
  height: 1rem;
  padding: 0.5rem;
  width: 33%;
}

.win {
  background-color: #dff0d8;
}
.loss {
  background-color: #f2dede;
}
</style>