<template>
  <h1 style="color: red" v-if="!connectedToEthereum">
    You need MetaMask to use this application
  </h1>
  <h1>Jack's First P2P Blockchain Betting Application</h1>
  <img width="100" src="./assets/coin.svg" />
  <h3>Your address: {{ address }}</h3>
  <p>Make a bet</p>
  <p>
    <input type="text" v-model="bet" />
    <label>ETH</label>
    <button @click="makeBet">Bet</button>
  </p>
  <p v-if="betError" style="color: red">{{ betError }}</p>
  <h3>Current Bets</h3>
  <table>
    <thead>
      <tr>
        <th>Address</th>
        <th>Side</th>
        <th>Wage</th>
        <th>Result</th>
        <th>Accept?</th>
      </tr>
    </thead>
    <tbody>
      <tr :key="bet.address" v-for="bet in bets">
        <td>{{ bet.address }}</td>
        <td>{{ bet.side }}</td>
        <td>{{ bet.wage }}</td>
        <td>{{ bet.result }}</td>
        <td><button :disabled="(bet.address = address)">Accept</button></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { onMounted, ref } from "vue";
import { ethers } from "ethers";

export default {
  name: "App",
  setup() {
    const connectedToEthereum = ref(false);

    const bet = ref(0);
    const betError = ref("");
    const bets = ref([]);

    const address = ref("");

    const makeBet = () => {
      if (!connectedToEthereum.value) {
        return;
      }
      if (bet.value <= 0) {
        betError.value = "You cannot bet 0 ETH";
        return;
      }
      betError.value = "";
      const newBet = {
        address: address.value,
        side: "Heads",
        wage: bet.value,
        result: "Pending",
        accepted: false,
      };
      bets.value.push(newBet);
      bet.value = 0;
    };

    onMounted(async () => {
      if (!window.ethereum) {
        connectedToEthereum.value = false;
        return;
      }
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        connectedToEthereum.value = true;
      } catch (error) {
        connectedToEthereum.value = false;
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      address.value = await signer.getAddress();
    });
    return {
      bet,
      betError,
      bets,
      makeBet,
      connectedToEthereum,
      address,
    };
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

html,
body {
  width: 100%;
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

table,
tr {
  border-collapse: collapse;
  border: 1px solid black;
  width: 100%;
}

th,
td {
  border: 1px solid black;
}
th {
  padding: 10px;
}
</style>