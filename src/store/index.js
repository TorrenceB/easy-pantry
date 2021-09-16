import Vuex from "vuex";
import Vue from "vue";
import featured from "@/store/modules/featured";
import category from "@/store/modules/category";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    featured,
    category,
  },
});
