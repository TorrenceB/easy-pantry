import fetchRecipeClient from "@/util/fetchRecipeClient";

const featuredStore = {
  state: {
    // featured: {},
    featured: {
      id: 716429,
      title: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
      servings: 2,
      aggregateLikes: 209,
      healthScore: 1300,
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
          const randomRecipe = response["recipes"][0];

          /* 
            1. Extract object properties that we're interested in
            2. Check values of each property, only want true values
            3. Create array that contains string representations of each true property
            4. transformRecipe.tags = [...values]
          */
          const {
            vegetarian,
            vegan,
            cheap,
            dairyFree,
            sustainable,
            glutenFree,
          } = randomRecipe || {};

          const tagsObj = {
            vegetarian,
            vegan,
            cheap,
            dairyFree,
            sustainable,
            glutenFree,
          };

          const getActiveTags = (tags = {}) => {
            const activeTags = [];

            for (let key in tags) {
              if (tags[key]) {
                activeTags.push(key);
              }
            }

            return activeTags;
          };

          const transformRecipe = {
            ...randomRecipe,
            tags: getActiveTags(tagsObj),
          };

          console.log(transformRecipe);

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
