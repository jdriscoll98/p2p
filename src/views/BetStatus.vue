<template>
  <div class="bet-status-page">
    <template v-if="status === 'pending'">
      <div class="coin" id="coin"></div>
      <h1>Coin flipping in progress!</h1>
      <button class="action-btn accept" @click="seeYourBets()">
        See all your bets
      </button>
    </template>
    <template v-else-if="status === 'waiting'">
      <div class="coin" id="coin"></div>
      <h1>Waiting for challenger...</h1>
      <button class="action-btn accept" @click="seeYourBets()">
        See all your bets
      </button>
      </template>
    <template v-else-if="status === 'won'">
      <div class="result won">
        <div class="result-title">You won!</div>
        <img src="../assets/trophy.png" />
        <div class="amount"> {{ amount/ 2 }} ETH</div>
        <button class="go-back-btn" @click="seeYourBets">
          See All Your Bets
        </button>
      </div>
    </template>
    <template v-else>
      <div class="result lost">
        <div class="result-title">You lost!</div>
        <img height="200" src="../assets/odd.png" />
        <div class="amount"> -{{ amount / 2 }} ETH</div>
        <button class="go-back-btn" @click="seeYourBets">
          See All Your Bets
        </button>
      </div>
    </template>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import useSpinningCoin from "@/composables/useSpinningCoin";
import useEthereum from "@/composables/useEthereum";
import Bet from "../../artifacts/contracts/Bet.sol/Bet.json";
import { ethers } from "ethers";
import JSConfetti from "js-confetti";

export default {
  name: "BetStatus",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { spinCoin } = useSpinningCoin();

    const seeYourBets = () => {
      router.push("/bets");
    };

    const status = ref("pending");
    const amount = ref("");

    const { connectedToEthereum, connectToEthereum, getProvider, getSigner } = useEthereum();

    onMounted(async () => {
      setInterval(spinCoin, 1000);

      if (!connectedToEthereum.value) {
        await connectToEthereum();
      }
      const provider = await getProvider();
      const signer = await getSigner();
      const signerAddress = await signer.getAddress();
      console.log("got provider");
      const bet = new ethers.Contract(route.params.id, Bet.abi, provider);
      const betor = await bet.betor();
      const betee = await bet.betee();
      const winner = await bet.winner();
      const wei = await bet.betAmount();
      amount.value = ethers.utils.formatEther(wei);
      console.log("bet info:", betor, betee, winner);

      // Later
      if (winner !== ethers.constants.AddressZero) {
        console.log("winner exists")
        status.value = winner === signerAddress ? "won" : "lost";
      }
      else if (betee === ethers.constants.AddressZero) {
        status.value = "waiting";
      } else {
        status.value = "pending";
      }
      
      if (status.value === "pending") {
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
      }
     
    });

    return {
      seeYourBets,
      status,
      spinCoin,
      amount,
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