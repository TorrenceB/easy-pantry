import Recipe from "@/models/recipe";
import fetchFeaturedRecipe from "@/util/api";

const featuredStore = {
  state: {
    featured: new Recipe(),
  },
  mutations: {
    setFeaturedRecipeState: (state, newFeaturedRecipe) =>
      (state.featured = newFeaturedRecipe),
  },
  getters: {
    featuredRecipes: (state) => state.featured,
  },
  actions: {
    async fetchFeatured() {
      try {
        await fetchFeaturedRecipe(
          "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=1&tags=vegetarian"
        ).then((randomRecipes) => {
          console.log(randomRecipes);
          // this.state.featured =
        });
      } catch (e) {
        console.error(e);
      }
    },
  },
};

export default featuredStore;
