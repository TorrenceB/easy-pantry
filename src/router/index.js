import Vue from "vue";
import VueRouter from "vue-router";
import Landing from "@/ui/Landing";
import RecipeResults from "@/ui/RecipeResults";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Landing",
    component: Landing,
  },
  {
    path: "/results",
    name: "results",
    component: RecipeResults,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
