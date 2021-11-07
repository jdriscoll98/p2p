<template>
  <div class="bet-page">
    <h1 class="bet-heading">Coin Flip</h1>
    <h3>Opponent's Bet</h3>
    <BetCard :address="bet?.betor" :amount="bet?.amountInEth" :choice="bet?.betorChoiceHR" />
    <!-- <div class="bet">
      <div class="bet-address">
        <span>0x00000</span>
      </div>
      <div class="bet-choice">
        <span>Heads</span>
      </div>
      <div class="bet-wager">
        <span>1 ETH</span>
      </div>
    </div> -->
    <h3>Your Bet</h3>
    <BetCard :address="signer" :amount="bet?.amountInEth" :choice="bet?.beteeChoiceHR" />
    <!-- <div class="bet">
      <div class="bet-address">
        <span>0x00000</span>
      </div>
      <div class="bet-choice">
        <span>Heads</span>
      </div>
      <div class="bet-wager">
        <span>1 ETH</span>
      </div>
    </div> -->
    <div class="action-buttons">
      <button @click="acceptBet" class="action-btn accept">Accept</button>
      <button @click="goBack" class="action-btn back">Go Back</button>
    </div>
  </div>
</template>

<script>


import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import useEthereum from "@/composables/useEthereum";
import Bet from "../../artifacts/contracts/Bet.sol/Bet.json";
import BetCard from "@/components/BetCard.vue";
import { ethers } from "ethers";
export default {
  name: "Bet",
  components: { BetCard },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const bet = ref("");
    const signer = ref("");

    const { connectedToEthereum, connectToEthereum, getProvider, getSigner } = useEthereum();

    onMounted(async () => {
      if (!connectedToEthereum.value) {
        await connectToEthereum();
      }
    });

    const goBack = () => {
      router.push(`/games/${route.params.address}/`);
    };

    const acceptBet = async () => {
      const signer = await getSigner();
      const bet = new ethers.Contract(route.params.id, Bet.abi, signer);
      const amount = await bet.betAmount();
      const tx = await bet.acceptBet({
        value: amount.toString()
      });
      await tx.wait();
      router.push("status");
    };

    const getBet = async () => {
      const provider = await getProvider();
      const bet = new ethers.Contract(route.params.id, Bet.abi, provider);
      const betor = await bet.betor();
      const amount = await bet.betAmount();
      const amountInEth = ethers.utils.formatEther(amount);
      const betorChoice = await bet.betorChoice();
      const betorChoiceHR = betorChoice === 1 ? "Heads" : "Tails";
      const beteeChoiceHR = betorChoice === 1 ? "Tails" : "Heads";
      return {betor, amountInEth, betorChoiceHR, beteeChoiceHR};
    }

    const getSignerAddress = async () => {
      const signer = await getSigner();
      return await signer.getAddress();
    }

    onMounted(async () => {
      if (!connectedToEthereum.value) {
        await connectToEthereum();
      }
      bet.value = await getBet();
      signer.value = await getSignerAddress();
    })

    return {
      goBack,
      acceptBet,
      bet,
      signer,
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