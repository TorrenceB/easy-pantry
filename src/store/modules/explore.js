import fetchRecipeClient from "@/util/fetchRecipeClient";

export default {
  state: () => ({
    ingredientSuggestions: [],
    selectedIngredients: [],
    recipesByIngredient: [],
  }),
  getters: {
    getIngredientSuggestions: (state) => state.ingredientSuggestions,
    getSelectedIngredients: (state) => state.selectedIngredients,
    getRecipesByIngredient: (state) => state.recipesByIngredient,
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
        await fetchRecipeClient(
          "https://api.spoonacular.com/food/ingredients/search",
          { query: ingredient }
        ).then(({ results }) => {
          console.log(results);

          commit("setIngredientSuggestions", results);
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
    setSelectedIngredients: (state, ingredient) => [
      ...state.selectedIngredients,
      ingredient,
    ],
  },
};
