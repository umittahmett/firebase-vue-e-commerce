import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { markRaw } from "vue";
import "./assets/index.css";

const pinia = createPinia();
const app = createApp(App);

pinia.use(({ store }) => {
  store.$router = markRaw(router);
});
app.use(router);
app.use(pinia);

app.mount("#app");
