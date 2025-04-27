import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Ensure the path to router.js is correct

const app = createApp(App);
app.use(router); // Register Vue Router
app.mount("#app");
