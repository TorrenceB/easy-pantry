import fetchRecipeClient from "@/util/fetchRecipeClient";

const featuredStore = {
  state: {
    featured: {},
    // featured: {
    //   id: 716429,
    //   recipeTitle: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
    //   numServings: 2,
    //   readyInMinutes: 45,
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
          commit("setFeaturedRecipeState", response["recipes"][0]);
        });
      } catch (e) {
        console.error(e);
      }
    },
  },
  mutations: {
    setFeaturedRecipeState: (state, newFeaturedRecipe) =>
      (state.featured = newFeaturedRecipe),
  },
};

export default featuredStore;
