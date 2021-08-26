import Recipe from "@/models/recipe";
import fetchRecipeData from "@/util/api";

const featuredStore = {
  state: {
    featured: new Recipe(),
  },
  mutations: {
    setFeaturedTitle: (state, newTitle) => (state.featured.title = newTitle),
    setFeaturedRecipe: (state, newFeaturedRecipe) =>
      (state.featured = newFeaturedRecipe),
  },
  getters: {
    getFeaturedTitle: (state) => state.featured.title,
  },
  actions: {
    async fetchData() {
      try {
        await fetchRecipeData(
          "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=1&tags=vegetarian"
        ).then((randomRecipes) => {
          this.mutations.setFeaturedRecipe(
            state.featured,
            Recipe.fromJSON(randomRecipes.recipes[0])
          );
        });
      } catch (e) {
        console.error(e);
      }
    },
  },
};

export default featuredStore;
