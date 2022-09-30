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
            Search recipes by ingredient or nutrients such as
            <strong>pasta</strong> or <strong>protein</strong>.
          </p>
        </div>
      </div>

      <v-autocomplete
        v-model="selectedValue"
        :search-input.sync="query"
        :items="suggestions"
        :loading="suggestionsIsLoading"
        :menu-props="{ closeOnContentClick: true, closeOnClick: true }"
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
        min-height="0"
      >
      </v-autocomplete>

      <button @click="fetchRecipes(parseSelectedIngredients)" class="button">
        <span v-if="!fetchingRecipes">Search</span>
        <v-progress-circular v-else indeterminate></v-progress-circular>
      </button>
    </div>

    <div v-if="recipes.length > 0" class="my-4">
      <Recipe
        v-for="recipe in recipes"
        :recipe="recipe"
        :key="recipe.id"
        :defaultTruncateState="false"
      />
    </div>
    <EmptyState v-else>
      <h3 class="text-h6 text--primary my-2">
        There are no results to display
      </h3>
      <p class="text-subtitle-2 text--secondary px-16">
        To find recipes to add to your pantry, type a few ingredients into the
        search bar above and press "Search".
      </p>
    </EmptyState>
  </v-container>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import debounce from "@/util/debounce";

import Recipe from "@/components/Recipe";
import EmptyState from "@/components/EmptyState";

export default {
  name: "Explore",
  components: {
    Recipe,
    EmptyState,
  },
  data: () => ({
    selectedValue: null,
    query: null,
    debounceSuggestions: null,
  }),
  computed: {
    ...mapGetters("explore", {
      recipes: "getRecipes",
      fetchingRecipes: "getFetchingRecipes",
      selectedIngredients: "getSelectedIngredients",
      suggestions: "getIngredientSuggestions",
      suggestionsIsLoading: "getSuggestionsIsLoading",
    }),
    /* API call requires request to be comma separated list */
    parseSelectedIngredients() {
      return this.selectedIngredients.join(",");
    },
  },
  methods: {
    ...mapActions("explore", ["fetchIngredientSuggestions", "fetchRecipes"]),
    ...mapMutations("explore", [
      "addSelectedIngredients",
      "updateSelectedIngredients",
      "setIngredientSuggestions",
    ]),
    ...mapMutations(["updateActivePage"]),
  },
  watch: {
    query(value) {
      if (!value) {
        this.setIngredientSuggestions([]);
        return;
      }

      this.setIngredientSuggestions([]);
      this.debounceSuggestions(value);
    },
    selectedValue(value) {
      this.updateSelectedIngredients(value);
      this.query = "";
    },
  },
  created() {
    this.updateActivePage("Explore");

    this.debounceSuggestions = debounce((value) => {
      this.fetchIngredientSuggestions(value);
    }, 500);
  },
  beforeUnmount() {
    this.debounceSuggestions.cancel();
  },
};
</script>
<style scoped>
.center {
  display: flex;
  flex-direction: column;
  justify-content: start;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 3rem;
  color: #fff;
  font-weight: bolder;
  background-color: rgb(65, 179, 163);
  border-radius: 0.5rem;
  margin: 1rem 0 0;
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
</style>
