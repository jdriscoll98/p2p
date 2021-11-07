import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";

import "primeicons/primeicons.css";

import Button from "primevue/button";

createApp(App)
  .use(router)
  .use(PrimeVue)
  .component("Button", Button)
  .mount("#app");
