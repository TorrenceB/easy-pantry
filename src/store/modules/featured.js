import fetchRecipeClient from "@/util/fetchRecipeClient";
// import Recipe from "@/models/recipe.js";

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

    /* Create random recipe in db & associate with user */
    // async create({}, recipe) {
    //   // const userRecipe = {
    //   //   id: recipe.id,
    //   //   title: recipe.title,
    //   //   image: recipe.image,
    //   //   instructions: recipe.instructions,
    //   //   summary: recipe.summary,
    //   //   diets: recipe.diets,
    //   //   attributes: recipe.tags,
    //   // };
    //   const userRecipe = Recipe(recipe);

    //   /*  */
    // },
  },
  mutations: {
    setFeaturedRecipeState: (state, newFeaturedRecipe) => {
      state.featured = newFeaturedRecipe;
    },
  },
};

export default featuredStore;
