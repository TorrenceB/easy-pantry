import fetchRecipeClient from "@/util/fetchRecipeClient";

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

    async get({ commit, dispatch }, id) {
      try {
        const recipe = await dispatch("recipe/get", id, { root: true });

        commit("setFeaturedRecipe", recipe);
      } catch (err) {
        console.error("!", "@state:featured::get", err);
      }
    },

    async create({ commit, dispatch }, recipe) {
      try {
        const createdRecipe = await dispatch("recipe/create", recipe, {
          root: true,
        });

        commit("setFeaturedRecipe", createdRecipe);
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
