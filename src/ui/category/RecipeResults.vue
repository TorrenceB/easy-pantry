<template>
  <v-container fluid fill-height>
    <v-row class="justify-center">
      <v-progress-circular
        v-if="isLoadingResults"
        indeterminate
        color="primary"
        size="60"
      ></v-progress-circular>
      <div v-else>
        <v-card
          v-for="category in getCategories"
          :key="category.id"
          class="my-4"
          width="95%"
        >
          <v-row>
            <v-col>
              <v-avatar tile size="95%" class="ma-2">
                <v-img :src="category.image"></v-img>
              </v-avatar>
            </v-col>
            <v-col class="d-flex flex-column justify-center">
              <v-card-title class="font-weight-bold text-h5 pa-0">{{
                category.title
              }}</v-card-title>
              <v-card-text class="mt-6 text-subtitle-1 pa-0">
                View Recipe <v-icon>mdi-arrow-right</v-icon></v-card-text
              >
            </v-col>
          </v-row>
        </v-card>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "RecipeResults",
  props: {
    category: {
      type: String,
    },
  },
  data: () => ({
    isLoadingResults: true,
  }),
  computed: {
    ...mapGetters("category", [
      "getItalianResults",
      "getMexicanResults",
      "getSeafoodResults",
      "getMediterraneanResults",
      "getVeganResults",
      "getVegetarianResults",
      "getGreekResults",
      "getQuickResults",
      "getSkilletResults",
    ]),
    getCategories() {
      switch (this.category) {
        case "italian":
          return this.getItalianResults;
        case "mexican":
          return this.getMexicanResults;
        case "seafood":
          return this.getSeafoodResults;
        case "mediterranean":
          return this.getMediterraneanResults;
        case "vegan":
          return this.getVeganResults;
        case "vegetarian":
          return this.getVegetarianResults;
        case "greek":
          return this.getGreekResults;
        case "quick":
          return this.getQuickResults;
        case "skillet":
          return this.getSkilletResults;
        default:
          return [];
      }
    },
  },
  methods: {
    ...mapActions("category", ["fetchRecipeByCategory"]),

    init() {
      this.fetchRecipeByCategory(this.category);

      this.isLoadingResults = false;
    },
  },
  async created() {
    await this.init();
  },
};
</script>
