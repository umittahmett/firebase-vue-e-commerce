import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { markRaw } from "vue";
import "./assets/index.css";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/lara-light-teal/theme.css";
import "primevue/resources/primevue.min.css"; /* Deprecated */
import "primeicons/primeicons.css";

const pinia = createPinia();
const app = createApp(App);

pinia.use(({ store }) => {
  store.$router = markRaw(router);
});
app.use(PrimeVue);
app.use(router);
app.use(pinia);

app.mount("#app");
