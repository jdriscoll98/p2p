<template>
  <h1 style="color: red" v-if="!hasMetaMask">
    You need MetaMask to use this application
  </h1>
  <h1>Jack's First P2P Blockchain Betting Application</h1>
  <img width="100" src="./assets/coin.svg" />
  <p>Make a bet</p>
  <p>
    <input type="text" v-model="bet" />
    <label>ETH</label>
    <button @click="makeBet">Bet</button>
  </p>
  <h3>Current Bets</h3>
  <table>
    <thead>
      <tr>
        <th>Address</th>
        <th>Side</th>
        <th>Wage</th>
        <th>Time Remaining</th>
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
        <td><button>Accept</button></td>
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
    const hasMetaMask = ref(false);

    const bet = ref(0);
    const bets = ref([]);

    const makeBet = () => {
      if (!hasMetaMask.value) {
        return;
      }
      const newBet = {
        address: "0x1234567890123456789012345678901234567890",
        side: "Heads",
        wage: bet.value,
        result: "Pending",
        accepted: false,
      };
      bets.value.push(newBet);
    };

    onMounted(async () => {
      if (!window.ethereum) {
        hasMetaMask.value = false;
        return;
      }
      window.ethereum.enable();
      hasMetaMask.value = true;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(provider);
      const signer = provider.getSigner();
      console.log(signer);
      const currentBlockNumber = await provider.getBlockNumber();
      console.log("Current Block Number", currentBlockNumber);
      // get current address of meta mask user
      signer.getAddress().then((address) => {
        console.log("Current Address", address);
      });
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);
      console.log(ethers.utils.formatEther(balance));
    });
    return {
      bet,
      bets,
      makeBet,
      hasMetaMask,
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