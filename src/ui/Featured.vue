<template>
  <v-container class="text-center">
    <v-toolbar>
      <v-text-field prepend-icon="mdi-magnify" rounded></v-text-field>
    </v-toolbar>
    <h2>Featured Recipe</h2>
    <v-card>
      <v-img :src="featuredRecipe.image"></v-img>
      <v-card-title>{{ featuredRecipe.recipeTitle }}</v-card-title>
      <v-card-subtitle
        >Number of Servings: {{ featuredRecipe.numServings }}</v-card-subtitle
      >
      <v-card-text>{{ featuredRecipe.recipeSummary }}</v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import store from "@/store/featured";

export default {
  name: "Featured",
  data: () => ({
    featuredRecipe: store.state.featured,
  }),
  mounted: function() {
    return store.actions.fetchData();
  },
};
</script>
