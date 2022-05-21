import fetchRecipeClient from "@/util/fetchRecipeClient";

export default {
  namespaced: true,
  state: () => ({
    ingredientSuggestions: [],
    selectedIngredients: [],
    recipesByIngredient: [],
    suggestionsIsLoading: false,
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
    addSelectedIngredients: (state, ingredient) =>
      state.selectedIngredients.push(ingredient),
    updateSelectedIngredients: (state, selectedIngredients) =>
      (state.selectedIngredients = selectedIngredients),
    setSuggestionsIsLoading: (state, isLoading) =>
      (state.suggestionsIsLoading = isLoading),
  },
};
