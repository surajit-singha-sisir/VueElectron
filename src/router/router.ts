import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Index from "../pages/Welcome/Index.vue";
import About from "../pages/About.vue";

// Define the route records with typing
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
