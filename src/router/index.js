import Vue from "vue";
import store from "../store";
import VueRouter from "vue-router";

import SignUp from "@/ui/authentication/SignUp";
import SignIn from "@/ui/authentication/SignIn";
import Landing from "@/ui/Landing";

Vue.use(VueRouter);

const routes = [
  {
    path: "/signUp",
    name: "SignUp",
    component: SignUp,
    meta: { guest: true },
  },
  {
    path: "/signIn",
    name: "SignIn",
    component: SignIn,
    meta: { guest: true },
  },
  {
    path: "/",
    name: "Landing",
    component: Landing,
    meta: { requiresAuth: true },
  },
  {
    path: "/results/:category",
    name: "results",
    component: () =>
      import(
        /* webpackChunkName: RecipeResults*/ "@/ui/category/RecipeResults"
      ),
    props: true,
  },
  {
    path: "/explore",
    name: "Explore",
    component: () =>
      import(/* webpackChunkName: Explore */ "@/ui/explore/Explore"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters["user/getAuthenticatedState"]) {
      next();

      return;
    } else {
      next({ name: "SignIn" });
    }
  } else {
    next();
  }
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters["user/getAuthenticatedState"]) {
      next({ name: "Landing" });

      return;
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
