import Vuex from "vuex";
import Vue from "vue";
import featured from "@/store/modules/featured";
import category from "@/store/modules/category";
import explore from "@/store/modules/explore";

Vue.use(Vuex);

export default new Vuex.Store({
  /* === TODO ===
    - Add user module
  */
  modules: {
    featured,
    category,
    explore,
  },
});
