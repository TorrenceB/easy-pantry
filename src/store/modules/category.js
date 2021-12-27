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
    async fetchRecipeByCategory({ commit }, category) {
      let options = {};

      switch (category) {
        case "italian":
          options = {
            params: {
              cuisine: "italian",
            },
            mutation: "setItalianResultState",
          };
          break;
        case "mexican":
          options = {
            params: {
              cuisine: "mexican",
            },
            mutation: "setMexicanResultState",
          };
          break;
        case "seafood":
          options = {
            params: {
              query: "seafood",
            },
            mutation: "setSeafoodResultState",
          };
          break;
        case "mediterranean":
          options = {
            params: {
              cuisine: "mediterranean",
            },
            mutation: "setMediterraneanResultState",
          };
          break;
        case "vegan":
          options = {
            params: {
              diet: "vegan",
            },
            mutation: "setVeganResultState",
          };
          break;
        case "vegetarian":
          options = {
            params: {
              diet: "vegetarian",
            },
            mutation: "setVegetarianResultState",
          };
          break;
        case "greek":
          options = {
            params: {
              cuisine: "greek",
            },
            mutation: "setGreekResultState",
          };
          break;
        case "quick":
          options = {
            params: {
              query: "easy",
              maxReadyTime: 20,
            },
            mutation: "setQuickResultState",
          };
      }

      try {
        await fetchRecipeClient(
          "https://api.spoonacular.com/recipes/complexSearch",
          options.params
        ).then((res) => {
          console.log(res);

          commit(options.mutation, res["results"]);
        });
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
    setMediterraneanResultState: (state, newResults) =>
      (state.mediterraneanResults = newResults),
    setVeganResultState: (state, newResults) =>
      (state.veganResults = newResults),
    setVegetarianResultState: (state, newResults) =>
      (state.vegetarianResults = newResults),
    setGreekResultState: (state, newResults) =>
      (state.greekResults = newResults),
    setQuickResultState: (state, newResults) =>
      (state.quickResults = newResults),
  },
};
