import fetchRecipeClient from "@/util/fetchRecipeClient";

const featuredStore = {
  state: {
    featured: {},
    // featured: {
    //   id: 716429,
    //   title: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
    //   servings: 2,
    //   aggregateLikes: 209,
    //   healthScore: 1300,
    //   readyInMinutes: 45,
    //   cheap: true,
    //   dairyFree: false,
    //   sustainable: true,
    //   vegan: false,
    //   vegetarian: true,
    //   image: "https://spoonacular.com/recipeImages/716429-556x370.jpg",
    // },
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
