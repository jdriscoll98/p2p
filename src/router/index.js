import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Game from "../views/Game.vue";
import Bet from "../views/Bet.vue";
import BetStatus from "../views/BetStatus.vue";
import BetHistory from "../views/BetHistory.vue";
import BetCreate from "../views/BetCreate.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/games/:title/",
    name: "Game",
    component: Game,
  },
  {
    path: "/games/:title/newbet",
    name: "BetCreate",
    component: BetCreate,
  },
  {
    path: "/games/:title/bets/:id/",
    name: "Bet",
    component: Bet,
  },
  {
    path: "/games/:title/bets/:id/status",
    name: "BetStatus",
    component: BetStatus,
  },
  {
    path: "/bets",
    name: "BetHistory",
    component: BetHistory,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
