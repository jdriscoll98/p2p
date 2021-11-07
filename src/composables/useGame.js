import useEthereum from "./useEthereum";
import { ethers } from "ethers";
import { onMounted, ref } from "vue";
import Game from "../../artifacts/contracts/Game.sol/Game.json";
export default function useGame(gameAddress) {
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
    game.value = { address, bets, title };
  });

  const addBetToGame = async (amount, choice) => {
    const signer = await getSigner();
    const gameContract = new ethers.Contract(gameAddress, Game.abi, signer);

    const enumChoice = choice === "Heads" ? 0 : 1;
    gameContract.on("BetCreated", (event) => {
      console.log(event);
    });
    await gameContract.addBet(enumChoice, {
      value: ethers.utils.parseEther(amount.toString()),
    });
  };

  return { game, addBetToGame };
}
