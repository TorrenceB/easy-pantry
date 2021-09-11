<template>
  <v-container class="text-center">
    <h2>Featured Recipe</h2>
    <v-card>
      <v-img :src="featuredRecipe.image"></v-img>
      <v-card-title>{{ featuredRecipe.title }}</v-card-title>
      <v-card-subtitle
        >Number of Servings: {{ featuredRecipe.servings }}</v-card-subtitle
      >
      <v-card-text
        >Ready in: {{ featuredRecipe.readyInMinutes }} minutes</v-card-text
      >
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Featured",
  methods: {
    ...mapActions(["fetchFeatured"]),
  },
  computed: {
    ...mapGetters(["featuredRecipe"]),
  },
  created() {
    this.fetchFeatured();
  },
};
</script>
