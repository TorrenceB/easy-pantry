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
    skilletResults: [],
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
    getSkilletResults: (state) => state.skilletResults,
  },

  actions: {
    async fetchRecipeByCategory({ commit }, category) {
      const categoryMap = {
        italian: {
          params: {
            cuisine: "italian",
          },
          mutation: "setItalianResultState",
        },
        mexican: {
          params: {
            cuisine: "mexican",
          },
          mutation: "setMexicanResultState",
        },
        seafood: {
          params: {
            query: "seafood",
          },
          mutation: "setSeafoodResultState",
        },
        mediterranean: {
          params: {
            cuisine: "mediterranean",
          },
          mutation: "setMediterraneanResultState",
        },
        vegan: {
          params: {
            diet: "vegan",
          },
          mutation: "setVeganResultState",
        },
        vegetarian: {
          params: {
            diet: "vegetarian",
          },
          mutation: "setVegetarianResultState",
        },
        greek: {
          params: {
            cuisine: "greek",
          },
          mutation: "setGreekResultState",
        },
        quick: {
          params: {
            query: "easy",
            maxReadyTime: 20,
          },
          mutation: "setQuickResultState",
        },
        skillet: {
          params: {
            query: "skillet",
          },
          mutation: "setSkilletResultState",
        },
      };

      try {
        await fetchRecipeClient(
          "https://api.spoonacular.com/recipes/complexSearch",
          categoryMap[category].params
        ).then((response) => {
          commit(categoryMap[category].mutation, response["results"]);
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
    setSkilletResultState: (state, newResults) =>
      (state.skilletResults = newResults),
  },
};
