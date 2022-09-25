<template>
  <v-container fluid>
    <div v-if="getIsFetchingResults" class="d-flex justify-center ">
      <v-progress-circular
        indeterminate
        color="green"
        size="60"
        :rotate="360"
      ></v-progress-circular>
    </div>
    <div v-else-if="!getIsFetchingResults && getCategories.length === 0">
      <v-row class="d-flex my-2">
        <v-btn @click="$router.go(-1)" width="5" text
          ><v-icon>mdi-arrow-left-circle-outline</v-icon></v-btn
        >
      </v-row>
      <EmptyState>
        <div class="px-8 text-center">
          <h3 class="text-h6 text--primary my-2">
            There are currently no results for this category.
          </h3>
          <p class="text-subtitle-2 text--secondary">
            Keep exploring by selecting one of the other Cuisine Tiles on the
            previous page.
          </p>
        </div>
      </EmptyState>
    </div>
    <div v-else class="d-flex flex-column p-4">
      <v-row class="d-flex my-2">
        <v-btn @click="$router.go(-1)" width="5" text
          ><v-icon>mdi-arrow-left-circle-outline</v-icon></v-btn
        >
        <h2 class="text-capitalize">{{ category }} Results</h2>
      </v-row>
      <Recipe
        v-for="recipe in getCategories"
        :key="recipe.id"
        :recipe="recipe"
      />
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import EmptyState from "@/components/EmptyState";

import Recipe from "@/components/Recipe";
export default {
  name: "RecipeResults",
  components: {
    Recipe,
    EmptyState,
  },
  props: {
    category: {
      type: String,
    },
  },
  computed: {
    ...mapGetters("category", [
      "getItalianResults",
      "getMexicanResults",
      "getSeafoodResults",
      "getVeganResults",
      "getVegetarianResults",
      "getQuickResults",
      "getIsFetchingResults",
    ]),
    getCategories() {
      switch (this.category) {
        case "italian":
          return this.getItalianResults;
        case "mexican":
          return this.getMexicanResults;
        case "seafood":
          return this.getSeafoodResults;
        case "vegan":
          return this.getVeganResults;
        case "vegetarian":
          return this.getVegetarianResults;
        case "quick":
          return this.getQuickResults;
        default:
          return [];
      }
    },
  },
  methods: {
    ...mapActions("category", ["fetchRecipeByCategory"]),

    init() {
      if (this.getCategories.length === 0) {
        this.fetchRecipeByCategory(this.category);
      }
    },
  },
  async created() {
    await this.init();
  },
};
</script>
