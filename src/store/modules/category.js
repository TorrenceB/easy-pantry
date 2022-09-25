import fetchRecipeClient from "@/util/fetchRecipeClient";

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
            number: 1,
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

        const recipeResults = await Promise.all(
          results.map(async ({ id }) => {
            const dbRecipe = await dispatch("recipe/get", id, {
              root: true,
            });

            if (!dbRecipe) {
              const recipe = await dispatch("recipe/fetchFromAPI", id, {
                root: true,
              });

              return await dispatch("recipe/create", recipe, {
                root: true,
              });
            } else {
              return dbRecipe;
            }
          })
        );

        commit(categoryMap[category].mutation, recipeResults);
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
    setIsFetchingResults: (state, isFetchingResults) =>
      (state.isFetchingResults = isFetchingResults),
  },
};
