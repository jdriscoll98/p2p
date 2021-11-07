<template>
  <div id="gamecard" class="card-container">
    <div class="card">
      <div class="card-heading">{{ title }}</div>
      <div class="card-image">
        <img src="../assets/coinflip3.png" role="presentation" />
      </div>
      <div class="card-footer">
        <button @click="openGame()" class="open-game-btn">Play game</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  name: "Gamecard",
  props: {
    title: {
      type: String,
      default: "Coin Flip",
    },
    address: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "../assets/coinflip3.png",
    },
  },
  setup(props) {
    const route = useRouter();

    const openGame = () => {
      route.push(`/games/${props.address}/`);
    };
    return {
      openGame,
    };
  },
};
</script>

<style>
.card-container {
  height: fit-content;
  width: 100%;
  padding: 1rem;
}

.card {
  height: 100%;
  width: 100%;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
  padding: 1rem;
}

.card-heading {
  font-size: 2rem;
  font-weight: bold;
}

.card-image {
  display: flex;
  justify-content: center;
}

.card-image > img {
  height: 200px;
}
.open-game-btn {
  width: 100%;
  height: 100%;
  margin: 1rem 0rem;
  padding: 0.5rem 0.5rem;
  border-radius: 0.5rem;
  background-color: #00a8ff;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
}
</style>