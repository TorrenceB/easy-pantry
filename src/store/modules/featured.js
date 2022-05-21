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
    async fetchFeatured({ commit }) {
      try {
        await fetchRecipeClient(
          "https://api.spoonacular.com/recipes/random"
        ).then((response) => {
          const randomRecipe = response["recipes"][0];

          const tags = [
            "vegetarian",
            "vegan",
            "cheap",
            "dairyFree",
            "sustainable",
            "glutenFree",
          ];

          const getActiveTags = (tags = []) => {
            return tags.filter((tag) => randomRecipe[tag]);
          };

          const transformRecipe = {
            ...randomRecipe,
            tags: getActiveTags(tags),
          };

          commit("setFeaturedRecipeState", transformRecipe);
        });
      } catch (e) {
        console.error(e);
      }
    },
  },
  mutations: {
    setFeaturedRecipeState: (state, newFeaturedRecipe) => {
      state.featured = newFeaturedRecipe;
    },
  },
};

export default featuredStore;
