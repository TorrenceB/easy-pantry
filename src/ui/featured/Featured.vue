<template>
  <v-container class="text-left">
    <h2 class="pb-4 text-md-h4">Featured Recipe</h2>
    <v-img :src="featuredRecipe.image" :alt="featuredRecipe.title">
      <v-app-bar flat color="rgba(0, 0, 0, 0)">
        <v-spacer></v-spacer>
        <v-btn icon @click="bookmarkIsChecked = !bookmarkIsChecked">
          <v-icon :color="bookmarkIsChecked ? '#ff6600' : '#fff'" size="60">
            mdi-cards-heart
          </v-icon>
        </v-btn>
      </v-app-bar>
    </v-img>
    <v-card-title class="text-left text-h6 font-weight-bold">{{
      featuredRecipe.title
    }}</v-card-title>
    <v-row class="d-flex align-center pl-4 text-h5">
      <v-rating length="1" :value="1" color="orange" size="35"></v-rating>
      <div>
        {{ featuredRecipe.aggregateLikes }}
      </div>
    </v-row>
    <v-card-text class="text-left subtitle-1 mb-4 font-weight-bold">
      Serves {{ featuredRecipe.servings }} . Ready in
      {{ featuredRecipe.readyInMinutes }} minutes .
      {{ featuredRecipe.healthScore }} Health Score
    </v-card-text>
    <v-row class="justify-start px-6" v-if="featuredRecipe.tags">
      <v-chip
        v-for="tag in featuredRecipe.tags"
        :key="tag.index"
        class="text-h6 mr-2 mb-4"
        color="#E27D60"
        outlined
        >{{ tag.toUpperCase() }}</v-chip
      >
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "Featured",
  data: () => ({
    bookmarkIsChecked: false,
  }),
  methods: {
    ...mapActions(["fetchFeatured"]),
    ...mapMutations({ setRecipe: "setFeaturedRecipeState" }),

    async updateFeatured() {
      /* Todo: Featured will be refreshed weekly */
      const currentUserRecipe = localStorage.getItem("currentRecipe");

      if (!currentUserRecipe) {
        await this.fetchFeatured();

        localStorage.setItem(
          "currentRecipe",
          JSON.stringify(this.featuredRecipe)
        );
      } else {
        this.setRecipe(JSON.parse(currentUserRecipe));
      }
    },
    init() {
      this.updateFeatured();
    },
  },
  computed: {
    ...mapGetters(["featuredRecipe"]),
  },
  created() {
    this.init();
  },
};
</script>
