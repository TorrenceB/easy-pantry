<template>
  <v-container class="center">
    <h2 class="pb-4 text-md-h4">Find a Recipe</h2>

    <!-- Suggestions -->
    <div class="search-container mb-4">
      <div class="d-flex mb-4">
        <div class="icon">
          <v-icon class="text-white" size="40">mdi-pasta</v-icon>
        </div>
        <div class="d-flex flex-column mx-4">
          <p class="ma-0 font-weight-bold">Search Ingredients</p>
          <p class="ma-0 text-body-2 text--secondary">
            Find Recipes using ingredients from your pantry
          </p>
        </div>
      </div>

      <v-autocomplete
        v-model="selectedValue"
        :search-input.sync="getIngredient"
        :items="suggestions"
        :loading="suggestionsIsLoading"
        cache-items
        label="Search Ingredients"
        placeholder="Example:Flour"
        chips
        deletable-chips
        multiple
        hide-no-data
        hide-selected
        hide-details
        outlined
      >
        <template v-slot:append>
          <button
            @click="fetchRecipesByIngredient(parseSelectedIngredients)"
            class="button"
          >
            Search
          </button>
        </template>
      </v-autocomplete>
    </div>

    <!-- Favorites Carousel -->
    <!-- <h3 class="d-flex">Favorites</h3>
    <v-carousel :height="300" hide-delimiters>
      <v-carousel-item></v-carousel-item>
    </v-carousel> -->

    <!-- Suggested Recipes Carousel -->
    <h3 class="d-flex">Suggested</h3>
    <v-carousel :height="300" hide-delimiters>
      <v-carousel-item
        v-for="{ title, id, image } in recipes"
        :key="id"
        class="card"
      >
        <v-btn
          icon
          @click="bookmarkIsChecked = !bookmarkIsChecked"
          class="card_favorite-icon"
        >
          <v-icon :color="bookmarkIsChecked ? '#ff6600' : '#fff'" size="60">
            mdi-cards-heart
          </v-icon>
        </v-btn>

        <v-img :src="image" :alt="title" class="card_image"> </v-img>
        <div class="card_footer-container">
          <span class="card_title">
            {{ title }}
          </span>

          <v-btn icon>
            <span>View</span>

            <v-icon size="30">
              mdi-arrow-right-bold
            </v-icon>
          </v-btn>
        </div>
      </v-carousel-item>
    </v-carousel>

    <!-- <v-progress-circular
      v-if="recipesIsLoading"
      indeterminate
      color="primary"
    ></v-progress-circular>
    <ul v-else>
      <li v-for="{ title, id } in recipes" :key="id">{{ title }}</li>
    </ul> -->
  </v-container>
  <!-- Empty State -->
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import debounce from "@/util/debounce";

export default {
  name: "Explore",
  data: () => ({
    bookmarkIsChecked: false,
    selectedValue: null,
    getIngredient: null,
  }),
  computed: {
    ...mapGetters("explore", {
      recipes: "getRecipesByIngredient",
      selectedIngredients: "getSelectedIngredients",
      suggestions: "getIngredientSuggestions",
      suggestionsIsLoading: "getSuggestionsIsLoading",
      recipesIsLoading: "getRecipesIsLoading",
    }),
    /* API call requires request to be comma separated list */
    parseSelectedIngredients() {
      return this.selectedIngredients.join("");
    },
  },
  methods: {
    ...mapActions("explore", [
      "fetchRecipesByIngredient",
      "fetchIngredientSuggestions",
    ]),
    ...mapMutations("explore", [
      "addSelectedIngredients",
      "updateSelectedIngredients",
    ]),
    ...mapMutations(["updateActivePage"]),
    /* Fetch Recipes with selectedIngredients */
    getRecipes() {
      this.fetchRecipesByIngredient(this.selectedIngredients);
    },
  },
  watch: {
    /* Fetch suggestions */
    getIngredient(value) {
      if (!value) {
        return [];
      }

      debounce(this.fetchIngredientSuggestions(value), 1000);
    },
    selectedValue(value) {
      Array.isArray(value)
        ? this.updateSelectedIngredients(value)
        : this.updateSelectedIngredients([value]);
    },
  },
  created() {
    this.updateActivePage("Explore");
  },
};
</script>
<style scoped>
.center {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 55%;
  color: #fff;
  font-weight: bolder;
  border-radius: 0.75rem;
}

.search-container {
  width: 100%;
  padding: 0.5rem;
  border-style: solid;
  border-width: thin;
  border-color: #808080;
  border-radius: 0.75rem;
}

.icon {
  background-color: #41b3a3;
  border-radius: 0.5em;
  height: 50%;
  padding: 0.25em;
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
