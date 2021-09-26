import fetchRecipeClient from "@/util/fetchRecipeClient";

const featuredStore = {
  state: {
    // featured: {},
    featured: {
      id: 716429,
      title: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
      servings: 2,
      aggregateLikes: 209,
      readyInMinutes: 45,
      cheap: true,
      dairyFree: false,
      sustainable: true,
      vegan: false,
      vegetarian: true,
      image: "https://spoonacular.com/recipeImages/716429-556x370.jpg",
    },
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
          /* 
            1. Get response object
            2. Target specific properties
            3. Group properties into array
            4. Create new property, tags and set value to new array
          */
          const randomRecipe = response["recipes"][0];
          const tags = Object.entries(randomRecipe).filter(([key]) => {
            return (
              key === "vegetarian" ||
              key === "vegan" ||
              key === "cheap" ||
              key === "dairyFree" ||
              key === "sustainable"
            );
          });

          const newRecipe = {
            ...randomRecipe,
            tags: Object.fromEntries(tags),
          };

          commit("setFeaturedRecipeState", newRecipe);
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
