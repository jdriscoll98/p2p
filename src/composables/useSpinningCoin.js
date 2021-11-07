import { onMounted, ref } from "vue";

export default function useSpinningCoin() {
  const degrees = ref(0);
  const spinCoin = () => {
    const coin = document.getElementById("coin");
    if (!coin) return;
    degrees.value = degrees.value >= 1800 ? 0 : degrees.value + 1800;
    coin.style.webkitTransform = "rotateY(" + degrees.value + "deg)";
    coin.style.MozTransform = "rotateY(" + degrees.value + "deg)";
    coin.style.msTransform = "rotateY(" + degrees.value + "deg)";
    coin.style.OTransform = "rotateY(" + degrees.value + "deg)";
    coin.style.transform = "rotateY(" + degrees.value + "deg)";
  };

  onMounted(() => {
    setInterval(spinCoin, 3000);
  });

  return {
    spinCoin,
  };
}
