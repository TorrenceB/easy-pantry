import fetchRecipeData from "@/util/api";

const carouselRecipeStore = {
  state: {
    seafoodRecipes: [],
  },
  mutations: {
    setSeafoodRecipeState: (state, newSeafoodRecipe) =>
      (state.seafoodRecipes = newSeafoodRecipe),
  },
  actions: {
    fetch() {
      fetchRecipeData("config.json").then((response) => {
        // 
      });
    },
  },
};

export default carouselRecipeStore;
