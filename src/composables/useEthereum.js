import { ref, onMounted } from "vue";
import { ethers } from "ethers";

export default function useEthereum() {
  const PLATFORM_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  const connectedToEthereum = ref(false);

  const connectToEthereum = async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      connectedToEthereum.value = true;
    } catch (error) {
      connectedToEthereum.value = false;
    }
  };

  onMounted(async () => {
    if (!window.ethereum) {
      connectedToEthereum.value = false;
      return;
    }
    await connectToEthereum();
  });

  const getProvider = () => {
    if (!window.ethereum) {
      return null;
    }

    return new ethers.providers.Web3Provider(window.ethereum);
  };
  const getSigner = () => {
    const provider = getProvider();
    if (!provider) {
      return null;
    }

    return provider.getSigner();
  };
  return {
    PLATFORM_ADDRESS,
    connectedToEthereum,
    connectToEthereum,
    getProvider,
    getSigner,
  };
}
