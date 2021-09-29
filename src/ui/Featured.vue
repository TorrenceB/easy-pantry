<template>
  <v-container class="text-center">
    <h2>Featured Recipe</h2>
    <v-card class="pa-4">
      <v-img :src="featuredRecipe.image"></v-img>
      <v-card-title class="text-left text-h5 font-weight-bold">{{
        featuredRecipe.title
      }}</v-card-title>
      <v-row class="d-flex align-center pl-4">
        <v-rating length="1" :value="1" color="orange"></v-rating>
        <div>
          {{ featuredRecipe.aggregateLikes }}
        </div>
      </v-row>
      <v-card-text class="text-left text-h6">
        Serves {{ featuredRecipe.servings }} . Ready in
        {{ featuredRecipe.readyInMinutes }} minutes
      </v-card-text>
      <v-row class="justify-start px-6" v-if="isTagActive">
        <v-chip
          v-for="tag in isTagActive"
          :key="tag.index"
          class="text-h6 mr-2"
          color="#E27D60"
          outlined
          >{{ tag.toUpperCase() }}</v-chip
        >
      </v-row>
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

    isTagActive() {
      let activeTags = {};
      for (let key in this.featuredRecipe.tags) {
        if (this.featuredRecipe.tags[key]) {
          activeTags[key] = key;
        }
      }

      console.log(activeTags);
      return activeTags;
    },
  },
  created() {
    this.fetchFeatured();
  },
};
</script>
