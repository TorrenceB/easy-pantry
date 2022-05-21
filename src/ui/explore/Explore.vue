<template>
  <div class="center">
    <h1>Find me a Recipe</h1>
    <!-- Suggestions -->
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
    ></v-autocomplete>

    <button
      @click="fetchRecipesByIngredient(parseSelectedIngredients)"
      class="button"
    >
      <p class="flex">Search</p>
    </button>
    <v-progress-circular
      v-if="recipesIsLoading"
      indeterminate
      color="primary"
    ></v-progress-circular>
    <ul v-else>
      <li v-for="{ title, id } in recipes" :key="id">{{ title }}</li>
    </ul>
  </div>
  <!-- Empty State -->
</template>
<script>
/* TODO
  1. Call getIngredient() onInput
  2. wrap getIngredient with a debounce function
  3. create dropdown & clickhandler for e.target.value
  4. add selected value to selected ingredients array
  5. Submit click handler: pass selectedIngredient list to fetchRecipes call

  6. Chips
  7. Configure AWS Backend
*/

import { mapActions, mapGetters, mapMutations } from "vuex";
import debounce from "@/util/debounce";

export default {
  name: "Explore",
  data: () => ({
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
  width: 55%;
  height: 3rem;
  color: #fff;
  font-weight: bolder;
  background-color: rgb(65, 179, 163);
  border-radius: 0.75rem;
}

.flex {
  display: flex;
  justify-content: center;
  margin: auto;
}

.input {
  color: #fff;
  padding: 0.5rem;
  border-style: solid;
  border-color: #808080;
  border-radius: 0.75rem;
}

.v-input {
  flex: none;
}
</style>
