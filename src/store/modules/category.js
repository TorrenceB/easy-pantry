import fetchRecipeClient from "@/util/fetchRecipeClient";

export default {
  state: () => ({
    italianResults: [],
    mexicanResults: [],
    seafoodResults: [],
  }),

  getters: {
    getItalianResults: (state) => state.italianResults,
    getMexicanResults: (state) => state.mexicanResults,
    getSeafoodResults: (state) => state.seafoodResults,
  },

  actions: {
    async fetchItalianResults() {
      try {
        await fetchRecipeClient(
          "https://api.spoonacular.com/recipes/complexSearch",
          { cuisine: "italian" }
        ).then((response) => console.log(response));
      } catch (e) {
        console.error(e);
      }
    },
    async fetchMexicanResults() {
      try {
        await fetchRecipeClient(
          "https://api.spoonacular.com/recipes/complexSearch",
          { cuisine: "mexican" }
        ).then((response) => console.log(response));
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
  },

  mutations: {
    setItalianResultState: (state, newResults) =>
      (state.italianResults = newResults),
    setMexicanResultState: (state, newResults) =>
      (state.mexicanResults = newResults),
    setSeafoodResultState: (state, newResults) =>
      (state.seafoodResults = newResults),
  },
};
