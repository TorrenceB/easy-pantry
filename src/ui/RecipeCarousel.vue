<template>
  <v-container>
    <v-row>
      <v-col>
        <v-carousel>
          <div v-for="recipe in recipes" :key="recipe.id">
            <h2>{{ recipe.recipeTitle }}</h2>
            <h4>Number of Servings: {{ recipe.numServings }}</h4>
            <v-carousel-item :src="recipe.image"> </v-carousel-item>
          </div>
        </v-carousel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import carouselRecipeStore from "@/store/carousel-recipe";

export default {
  name: "Recipe Carousel",
  data: () => ({
    recipes: carouselRecipeStore.state.seafoodRecipes,
  }),
  computed: {
    fetch() {},
  },
  // mounted: function() {
  //   const enrichedRecipes = [];

  //   fetchRecipeData(
  //     "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=seafood&number=5"
  //   ).then(async (res) => {
  //     const baseUri = "https://spoonacular.com/recipeImages/";

  //     await res.results.map((result) => {
  //       result.image = `${baseUri}${result.image}`;
  //       enrichedRecipes.push(Recipe.fromJSON(result));
  //     });

  //     this.recipes = [...enrichedRecipes];

  //     return enrichedRecipes;
  //   });
  // },
};
</script>
