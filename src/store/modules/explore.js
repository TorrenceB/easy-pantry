import fetchRecipeClient from "@/util/fetchRecipeClient";

export default {
  state: () => ({
    ingredientSuggestions: [],
    selectedIngredients: [],
    recipesByIngredient: [],
    suggestionsIsLoading: false,
  }),
  getters: {
    getIngredientSuggestions: (state) => {
      /* Prop names must match w/ item props of v-autocomplete */
      return state.ingredientSuggestions.map(({ id, name }) => ({
        value: id,
        text: name,
        disabled: false,
      }));
    },
    getSelectedIngredients: (state) => state.selectedIngredients,
    getRecipesByIngredient: (state) => state.recipesByIngredient,
    getSuggestionsIsLoading: (state) => state.suggestionsIsLoading,
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

        await fetchRecipeClient(
          "https://api.spoonacular.com/food/ingredients/search",
          { query: ingredient }
        ).then(({ results }) => {
          console.log(results);

          commit("setIngredientSuggestions", results);
          commit("setSuggestionsIsLoading", false);
        });
      } catch (err) {
        console.error(err);
      }
    },
    fetchRecipesByIngredient: async ({ commit }, ingredients) => {
      /* TODO
        1. separate ingredients array into string of comma
          separated strings
      */
      try {
        await fetchRecipeClient(
          "https://api.spoonacular.com/recipes/findByIngredients",
          { ingredients }
        ).then((res) => {
          console.log(res);

          commit("setRecipesByIngredient", res);
        });
      } catch (err) {
        console.error(err);
      }
    },
  },
  mutations: {
    setIngredientSuggestions: (state, ingredient) =>
      (state.ingredientSuggestions = ingredient),
    setRecipesByIngredient: (state, recipesByIngredient) =>
      (state.recipesByIngredient = recipesByIngredient),
    setSelectedIngredients: (state, ingredient) => [
      ...state.selectedIngredients,
      ingredient,
    ],
    setSuggestionsIsLoading: (state, isLoading) =>
      (state.suggestionsIsLoading = isLoading),
  },
};
