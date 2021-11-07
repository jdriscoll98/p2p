import useEthereum from "./useEthereum";
import { ethers } from "ethers";
import { onMounted, ref } from "vue";
import Game from "../../artifacts/contracts/Game.sol/Game.json";
export default function useGame(gameAddress) {
  const { connectedToEthereum, connectToEthereum, getProvider } = useEthereum();

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

  return { game };
}
