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
    async fetch() {
      await fetchRecipeData("/config.json").then((response) => {
        this.setSeafoodRecipeState(response);
      });
    },
  },
};

export default carouselRecipeStore;
