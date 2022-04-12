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

    <!-- Grid buckets -->
    <div class="bucket-wrapper">
      <div class="flex-col py-3 bucket-bg-color rounded">
        <strong class="font-weight-bold text-h6">
          {{ featuredRecipe.aggregateLikes }}
        </strong>
        <p class="text-subtitle-2 mb-0">Rating</p>
      </div>

      <div class="flex-col py-3 bucket-bg-color rounded">
        <strong class="font-weight-bold text-h6">{{
          featuredRecipe.servings
        }}</strong>
        <p class="text-subtitle-2 mb-0">Servings</p>
      </div>
      <div class="flex-col py-3 bucket-bg-color rounded">
        <span class="d-flex align-center">
          <strong class="font-weight-bold text-h6">{{
            featuredRecipe.readyInMinutes
          }}</strong>
          <p class="text-caption mb-0 ml-1">Min</p>
        </span>
        <p class="text-subtitle-2 mb-0">Prepare</p>
      </div>
      <div class="flex-col py-3 bucket-bg-color rounded">
        <strong class="font-weight-bold text-h6">{{
          featuredRecipe.healthScore
        }}</strong>
        <p class="text-subtitle-2 mb-0">Health Score</p>
      </div>
    </div>
    <div class="flex mt-4" v-if="featuredRecipe.tags">
      <v-chip
        v-for="tag in featuredRecipe.tags"
        :key="tag.index"
        class="text-h6 mr-2 mb-4"
        color="#E27D60"
        outlined
        >{{ tag.toUpperCase() }}</v-chip
      >
    </div>
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

    // async updateFeatured() {
    //   /* Todo: Featured will be refreshed weekly */
    //   const currentUserRecipe = localStorage.getItem("currentRecipe");

    //   if (!currentUserRecipe) {
    //     await this.fetchFeatured();

    //     localStorage.setItem(
    //       "currentRecipe",
    //       JSON.stringify(this.featuredRecipe)
    //     );
    //   } else {
    //     this.setRecipe(JSON.parse(currentUserRecipe));
    //   }
    // },
    init() {
      // this.updateFeatured();
      this.fetchFeatured();
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

<style scoped>
.bucket-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr;
  column-gap: 0.25rem;
}

.bucket-bg-color {
  background: rgb(65, 179, 163);
}

.flex-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.flex {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
}
</style>
