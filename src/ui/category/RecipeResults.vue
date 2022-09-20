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

import Recipe from "@/components/Recipe";
export default {
  name: "RecipeResults",
  components: {
    Recipe,
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
      this.fetchRecipeByCategory(this.category);
    },
  },
  async created() {
    await this.init();
  },
};
</script>
