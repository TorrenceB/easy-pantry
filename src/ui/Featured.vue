<template>
  <v-container class="text-center">
    <v-toolbar>
      <v-text-field prepend-icon="mdi-magnify" rounded></v-text-field>
    </v-toolbar>
    <h2>Featured Recipe</h2>
    <v-card>
      <v-img :src="featuredRecipe.image"></v-img>
    </v-card>
  </v-container>
</template>

<script>
// import fetchRecipeData from "@/util/api.js";

export default {
  name: "Featured",
  data: () => ({
    featuredRecipe: {},
  }),
  // mounted: function() {
  //   this.featuredRecipe = fetchRecipeData(
  //     "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=1&tags=vegetarian"
  //   ).then((randomRecipes) => {
  //     this.featuredRecipe = randomRecipes.recipes[0];
  //   });
  // },
};
</script>
