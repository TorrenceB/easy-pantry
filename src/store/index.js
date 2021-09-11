import Vuex from "vuex";
import Vue from "vue";
import featured from "@/store/modules/featured";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    featured,
  },
});
