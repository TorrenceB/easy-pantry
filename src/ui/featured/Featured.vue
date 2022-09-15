<template>
  <v-container class="text-left">
    <h2 class="pb-4 text-md-h4">Featured Recipe</h2>

    <div class="card">
      <v-btn
        icon
        @click="bookmarkIsChecked = !bookmarkIsChecked"
        class="card_favorite-icon"
      >
        <v-icon :color="bookmarkIsChecked ? '#ff6600' : '#fff'" size="60">
          mdi-cards-heart
        </v-icon>
      </v-btn>

      <v-img
        :src="featuredRecipe.image"
        :alt="featuredRecipe.title"
        class="card_image"
      >
      </v-img>
      <div class="card_footer-container">
        <span class="card_title">
          {{ featuredRecipe.title }}
        </span>

        <v-btn icon>
          <span>View</span>

          <v-icon size="30">
            mdi-arrow-right-bold
          </v-icon>
        </v-btn>
      </div>
    </div>

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
    <div class="flex mt-4" v-if="featuredRecipe.diets">
      <v-chip
        v-for="diet in featuredRecipe.diets"
        :key="diet.index"
        class="text-h6 mr-2 mb-4"
        color="#E27D60"
        outlined
        >{{ diet.toUpperCase() }}</v-chip
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
    ...mapActions("featured", ["fetchFeatured"]),
    ...mapMutations("featured", { setRecipe: "setFeaturedRecipeState" }),

    init() {
      this.fetchFeatured();
    },
  },
  computed: {
    ...mapGetters("featured", ["featuredRecipe"]),
  },
  created() {
    // this.init();
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

.card {
  position: relative;
  margin: 0.5em 0;
}

.card_title {
  display: flex;

  font-weight: 800;
  font-size: large;
}

.card_image {
  opacity: 0.5;
  border-radius: 0.5em;
}

.card_favorite-icon {
  z-index: 10;
  position: absolute;
  right: 1.5em;
  top: 1em;
}

.card_footer-container {
  z-index: 10;
  position: absolute;
  bottom: 0;
  margin: 1em 0;
  padding: 0 1.5em;

  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
</style>
