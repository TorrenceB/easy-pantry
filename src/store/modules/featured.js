import fetchRecipeClient from "@/util/fetchRecipeClient";
import Recipe from "@/models/recipe.js";

import { API, graphqlOperation } from "aws-amplify";
import { createRecipe } from "../../graphql/mutations";
import { getRecipe } from "../../graphql/queries";

const featuredStore = {
  namespaced: true,
  state: {
    featured: {},
  },
  getters: {
    featuredRecipe: (state) => state.featured,
  },
  actions: {
    async fetchFeatured({ dispatch }) {
      try {
        await fetchRecipeClient(
          "https://api.spoonacular.com/recipes/random"
        ).then((response) => {
          const randomRecipe = response["recipes"][0];

          const diets = [
            "vegetarian",
            "vegan",
            "cheap",
            "dairyFree",
            "sustainable",
            "glutenFree",
          ];

          const getActiveTags = (diets = []) => {
            return diets.filter((diet) => randomRecipe[diet]);
          };

          const transformRecipe = {
            ...randomRecipe,
            diets: getActiveTags(diets),
          };

          dispatch("create", transformRecipe);
        });
      } catch (err) {
        console.error("!", "@state:featured::fetchFeatured", err);
      }
    },

    async get({ commit }, id) {
      try {
        const { data } = await API.graphql(graphqlOperation(getRecipe, { id }));

        commit("setFeaturedRecipe", data.getRecipe);
      } catch (err) {
        console.error("!", "@state:featured::get", err);
      }
    },

    async create({ commit }, recipe) {
      const featuredRecipe = Recipe(recipe);

      try {
        const { data } = await API.graphql(
          graphqlOperation(createRecipe, { input: featuredRecipe })
        );

        commit("setFeaturedRecipeState", data.createRecipe);
      } catch (err) {
        console.error("!", "@state:featured::create", err);
      }
    },
  },
  mutations: {
    setFeaturedRecipe: (state, newFeaturedRecipe) => {
      state.featured = newFeaturedRecipe;
    },
  },
};

export default featuredStore;
