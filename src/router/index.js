import Vue from "vue";
import VueRouter from "vue-router";
import Landing from "@/ui/Landing";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Landing",
    component: Landing,
  },
  {
    path: "/results/:category",
    name: "results",
    component: () =>
      import(/* webpackChunkName: RecipeResults*/ "@/ui/RecipeResults"),
    props: true,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
