import fetchRecipeClient from "@/util/fetchRecipeClient";

export default {
  state: () => ({
    italianResults: [],
  }),

  getters: {
    getItalianResults: (state) => state.italianResults,
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
  },

  mutations: {
    setItalianResultsState: (state, newResults) =>
      (state.italianResults = newResults),
  },
};
