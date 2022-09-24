import fetchRecipeClient from "@/util/fetchRecipeClient";
import Recipe from "@/models/recipe";

export default {
  namespaced: true,
  state: () => ({
    recipes: [],
    ingredientSuggestions: [],
    selectedIngredients: [],
    suggestionsIsLoading: false,
    fetchingRecipes: false,
  }),
  getters: {
    getIngredientSuggestions: (state) => {
      /* Prop names must match w/ item props of v-autocomplete: https://vuetifyjs.com/en/components/autocompletes/ */
      return state.ingredientSuggestions.map(({ id, name }) => ({
        id,
        value: name,
        text: name,
        disabled: false,
      }));
    },
    getRecipes: (state) => state.recipes,
    getFetchingRecipes: (state) => state.fetchingRecipes,
    getSelectedIngredients: (state) => state.selectedIngredients,
    getRecipesByIngredient: (state) => state.recipesByIngredient,
    getSuggestionsIsLoading: (state) => state.suggestionsIsLoading,
    getRecipesIsLoading: (state) => state.recipesIsLoading,
  },
  actions: {
    /**
     * @async
     * @function fetchIngredientSuggestions
     * @param { string } ingredient
     * @return { Promise }
     */

    fetchIngredientSuggestions: async ({ commit }, ingredient) => {
      try {
        commit("setSuggestionsIsLoading", true);

        const {
          results,
        } = await fetchRecipeClient(
          "https://api.spoonacular.com/food/ingredients/search",
          { query: ingredient }
        );
        console.log(results);

        commit("setIngredientSuggestions", results);
        commit("setSuggestionsIsLoading", false);
      } catch (err) {
        console.error(err);
      }
    },
    /**
     * @async
     * @function fetchRecipes
     * @desc fetch recipes with complex search endpoint
     *
     * @params { object } context
     * @params { string } query
     *
     * @returns { promise }
     */
    async fetchRecipes({ commit, dispatch }, query) {
      commit("setFetchingRecipes", true);

      try {
        const {
          results,
        } = await fetchRecipeClient(
          "https://api.spoonacular.com/recipes/complexSearch",
          { query, number: 2 }
        );

        const enrichRecipeResults = await Promise.all(
          results.map(async ({ id }) => {
            const recipe = await dispatch("recipe/fetchFromAPI", id, {
              root: true,
            });

            return Recipe(recipe);
          })
        );

        commit("setRecipes", enrichRecipeResults);
        commit("setFetchingRecipes", false);
      } catch (err) {
        console.error("!", "@state:explore:fetchRecipes", err);

        commit("setFetchingRecipes", false);
      }
    },
  },
  mutations: {
    setRecipes: (state, recipes) => (state.recipes = recipes),
    setFetchingRecipes: (state, fetchingRecipes) =>
      (state.fetchingRecipes = fetchingRecipes),
    setIngredientSuggestions: (state, ingredient) =>
      (state.ingredientSuggestions = ingredient),
    setSuggestionsIsLoading: (state, isLoading) =>
      (state.suggestionsIsLoading = isLoading),
    addSelectedIngredients: (state, ingredient) =>
      state.selectedIngredients.push(...ingredient),
    updateSelectedIngredients: (state, selectedIngredients) =>
      (state.selectedIngredients = selectedIngredients),
  },
};
