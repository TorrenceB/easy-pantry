import { API, graphqlOperation } from "aws-amplify";
import { getRecipe } from "../../graphql/queries";
import { createRecipe, updateRecipe } from "../../graphql/mutations";

import fetchRecipeClient from "@/util/fetchRecipeClient";
import Recipe from "@/models/recipe.js";

export default {
  namespaced: true,
  state: () => ({}),
  getters: {},
  mutations: {},
  actions: {
    /**
     * @async
     * @function fetchFromAPI
     * @desc query for single recipe data in spoonacular API
     *
     * @param { object } context
     * @param { number } id
     */
    async fetchFromAPI(_, id) {
      try {
        const recipe = await fetchRecipeClient(
          `https://api.spoonacular.com/recipes/${id}/information`
        );

        return recipe;
      } catch (err) {
        console.error("!", "@state:explore::getSingleRecipe", err);
      }
    },
    /**
     * @async
     * @function get
     * @desc query for recipe in DB
     *
     * @param { object } context
     * @param { string } id
     *
     * @returns { object } recipe
     */
    async get(_, id) {
      try {
        const { data } = await API.graphql(graphqlOperation(getRecipe, { id }));

        return data.getRecipe;
      } catch (err) {
        console.error("!", "@state:recipe::get", err);
      }
    },
    async create(_, recipe = {}) {
      const createdRecipe = Recipe(recipe);

      try {
        const { data } = await API.graphql(
          graphqlOperation(createRecipe, { input: createdRecipe })
        );

        return data.createRecipe;
      } catch (err) {
        console.error("!", "@state:recipe::create", err);
      }
    },
    async update(_, recipe = {}) {
      try {
        const { data } = await API.graphql(
          graphqlOperation(updateRecipe, { input: recipe })
        );

        return data.updateRecipe;
      } catch (err) {
        console.error("!", "@state:recipe::update", err);
      }
    },
  },
};
