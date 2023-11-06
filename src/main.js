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
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBIgPC68AG_2l2qZhZn7-QUCr6CX9VhiSI",
  authDomain: "seckin-bilisim.firebaseapp.com",
  projectId: "seckin-bilisim",
  storageBucket: "seckin-bilisim.appspot.com",
  messagingSenderId: "801879207834",
  appId: "1:801879207834:web:97cfd798c4308da39e5423",
  measurementId: "G-HR6JEFJ16T",
};

// Initialize Firebase
const fapp = initializeApp(firebaseConfig);
const analytics = getAnalytics(fapp);

const pinia = createPinia();
const app = createApp(App);

pinia.use(({ store }) => {
  store.$router = markRaw(router);
});
app.use(PrimeVue);
app.use(router);
app.use(pinia);
app.use(analytics);

app.mount("#app");
