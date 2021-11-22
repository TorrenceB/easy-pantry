import fetchRecipeClient from "@/util/fetchRecipeClient";

export default {
  state: () => ({
    italianResults: [],
    mexicanResults: [],
    seafoodResults: [],
    mediterraneanResults: [],
    veganResults: [],
    vegetarianResults: [],
    greekResults: [],
    quickResults: [],
  }),

  getters: {
    getItalianResults: (state) => state.italianResults,
    getMexicanResults: (state) => state.mexicanResults,
    getSeafoodResults: (state) => state.seafoodResults,
    getMediterraneanResults: (state) => state.mediterraneanResults,
    getVeganResults: (state) => state.veganResults,
    getVegetarianResults: (state) => state.vegetarianResults,
    getGreekResults: (state) => state.greekResults,
    getQuickResults: (state) => state.quickResults,
  },

  actions: {
    async fetchItalianResults({ commit }) {
      try {
        await fetchRecipeClient(
          "https://api.spoonacular.com/recipes/complexSearch",
          { cuisine: "italian" }
        ).then((response) => {
          console.log(response["results"]);

          commit("setItalianResultState", response["results"]);
        });
      } catch (e) {
        console.error(e);
      }
    },
    async fetchMexicanResults({ commit }) {
      try {
        await fetchRecipeClient(
          "https://api.spoonacular.com/recipes/complexSearch",
          { cuisine: "mexican" }
        ).then((response) => {
          commit("setMexicanResultState", response["results"]);
        });
      } catch (e) {
        console.error(e);
      }
    },
    async fetchSeafoodResults() {
      try {
        await fetchRecipeClient(
          "https://api.spoonacular.com/recipes/complexSearch",
          { query: "seafood" }
        ).then((response) => console.log(response));
      } catch (e) {
        console.error(e);
      }
    },
    async fetchMediterraneanResults() {
      try {
        await fetchRecipeClient(
          "https://api.spoonacular.com/recipes/complexSearch",
          { cuisine: "mediterranean" }
        ).then((response) => console.log(response));
      } catch (e) {
        console.error(e);
      }
    },
    async fetchVeganResults() {},
    async fetchVegitarianResults() {},
    async fetchGreekResults() {},
    async fetchQuickResults() {
      try {
        await fetchRecipeClient(
          "https://api.spoonacular.com/recipes/complexSearch",
          { query: "easy", maxReadyTime: 20 }
        ).then((response) => console.log(response));
      } catch (e) {
        console.error(e);
      }
    },

    async fetchResultsByCategory({ commit }, category) {
      let categories = [];

      if (category === "italian") {
        categories = console.log("test");
      }

      commit("setItalianResultState", categories);
      console.log(categories);
    },
  },

  mutations: {
    setItalianResultState: (state, newResults) =>
      (state.italianResults = newResults),
    setMexicanResultState: (state, newResults) =>
      (state.mexicanResults = newResults),
    setSeafoodResultState: (state, newResults) =>
      (state.seafoodResults = newResults),
    setMediterraneanResultState: (state, newResults) =>
      (state.mediterraneanResults = newResults),
    setVeganResultState: (state, newResults) =>
      (state.veganResults = newResults),
    setVegetarianResultState: (state, newResults) =>
      (state.vegetarianResults = newResults),
    setQuickResultState: (state, newResults) =>
      (state.quickResults = newResults),
  },
};
