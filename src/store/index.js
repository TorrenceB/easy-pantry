import Vuex from "vuex";
import Vue from "vue";
import auth from "@/store/modules/auth";
import user from "@/store/modules/user";
import recipe from "@/store/modules/recipe";
import featured from "@/store/modules/featured";
import category from "@/store/modules/category";
import explore from "@/store/modules/explore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: () => ({
    activePage: "Home",
  }),
  getters: {
    getActivePage: (state) => state.activePage,
  },
  mutations: {
    updateActivePage: (state, activePage) => (state.activePage = activePage),
  },
  modules: {
    auth,
    user,
    featured,
    category,
    explore,
    recipe,
  },
});
