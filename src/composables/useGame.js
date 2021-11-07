import useEthereum from "./useEthereum";
import { ethers } from "ethers";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import Game from "../../artifacts/contracts/Game.sol/Game.json";
import Bet from "../../artifacts/contracts/Bet.sol/Bet.json";

export default function useGame(gameAddress) {
  const router = useRouter();

  const { connectedToEthereum, connectToEthereum, getProvider, getSigner } =
    useEthereum();

  const game = ref(null);

  onMounted(async () => {
    if (!connectedToEthereum.value) {
      await connectToEthereum();
    }

    const provider = getProvider();

    const gameContract = new ethers.Contract(gameAddress, Game.abi, provider);
    const [address, bets, title] = await gameContract.getGame();
    const promises = await bets.map(async (betAddress) => {
      const bet = new ethers.Contract(betAddress, Bet.abi, provider);
      // const betAddress = bet.address;
      const amount = await bet.betAmount();
      const amountInEth = ethers.utils.formatEther(amount);
      const choice = await bet.betorChoice();
      const gameChoice = choice.toNumber() === 1 ? "Heads" : "Tails";
      return { betAddress, amountInEth, gameChoice };
    });
    const resolvedBets = await Promise.all(promises);
    console.log(resolvedBets);
    game.value = { address, bets: resolvedBets, title };
  });

  const newBet = ref("");

  const addBetToGame = async (amount, choice) => {
    const signer = await getSigner();
    const gameContract = new ethers.Contract(gameAddress, Game.abi, signer);

    const enumChoice = choice === "Heads" ? 1 : 2;

    gameContract.on("BetCreated", (address) => {
      newBet.value = address;
    });
    const tx = await gameContract.addBet(enumChoice, {
      value: ethers.utils.parseEther(amount.toString()),
    });
    await tx.wait();
    setTimeout(() => {
      router.push(`/games/${gameAddress}/bets/${newBet.value}/status`);
    }, 1000);
  };

  return { game, addBetToGame };
}
