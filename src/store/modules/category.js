import fetchRecipeClient from "@/util/fetchRecipeClient";

export default {
  state: () => ({
    italianResults: [],
    mexicanResults: [],
  }),

  getters: {
    getItalianResults: (state) => state.italianResults,
    getMexicanResults: (state) => state.mexicanResults,
  },

  actions: {
    async fetchItalianResults() {
      try {
        await fetchRecipeClient(
          "https://api.spoonacular.com/recipes/complexSearch",
          "cuisine=italian"
        ).then((response) => console.log(response));
      } catch (e) {
        console.error(e);
      }
    },
    async fetchMexicanResults() {
      try {
        await fetchRecipeClient(
          "https://api.spoonacular.com/recipes/complexSearch",
          "cuisine=mexican"
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
  },
};
