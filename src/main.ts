import { createApp } from 'vue';
import App from './App.vue';
import { createHead } from '@vueuse/head';
import router from './router/router';
import './assets/styles/onuman.scss';

const app = createApp(App);
const head = createHead();

app.use(head);
app.use(router);
app.mount('#app');
