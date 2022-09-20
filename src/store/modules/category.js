import fetchRecipeClient from "@/util/fetchRecipeClient";
import Recipe from "@/models/recipe";

export default {
  namespaced: true,
  state: () => ({
    italianResults: [],
    mexicanResults: [],
    seafoodResults: [],
    veganResults: [],
    vegetarianResults: [],
    quickResults: [],
    isFetchingResults: false,
  }),

  getters: {
    getItalianResults: (state) => state.italianResults,
    getMexicanResults: (state) => state.mexicanResults,
    getSeafoodResults: (state) => state.seafoodResults,
    getVeganResults: (state) => state.veganResults,
    getVegetarianResults: (state) => state.vegetarianResults,
    getQuickResults: (state) => state.quickResults,
    getIsFetchingResults: (state) => state.isFetchingResults,
  },

  actions: {
    async fetchRecipeByCategory({ commit, dispatch }, category) {
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

        quick: {
          params: {
            query: "easy",
            maxReadyTime: 20,
          },
          mutation: "setQuickResultState",
        },
      };

      commit("setIsFetchingResults", true);

      try {
        const { results } = await fetchRecipeClient(
          "https://api.spoonacular.com/recipes/complexSearch",
          categoryMap[category].params
        );

        const enrichRecipeResults = await Promise.all(
          results.map(async ({ id }) => {
            const recipe = await dispatch("explore/getSingleRecipe", id, {
              root: true,
            });

            return Recipe(recipe);
          })
        );

        commit(categoryMap[category].mutation, enrichRecipeResults);
        commit("setIsFetchingResults", false);
      } catch (e) {
        console.error(e);
        commit("setIsFetchingResults", false);
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
    setVeganResultState: (state, newResults) =>
      (state.veganResults = newResults),
    setVegetarianResultState: (state, newResults) =>
      (state.vegetarianResults = newResults),
    setQuickResultState: (state, newResults) =>
      (state.quickResults = newResults),
    setSkilletResultState: (state, newResults) =>
      (state.skilletResults = newResults),
    setIsFetchingResults: (state, isFetchingResults) =>
      (state.isFetchingResults = isFetchingResults),
  },
};
