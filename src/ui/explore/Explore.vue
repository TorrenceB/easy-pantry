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
      multiple
    ></v-autocomplete>

    <button @click="setIngredients(selectedValue)" class="button">
      <p class="flex">Search</p>
    </button>
    <!-- <ul>
      <li v-for="recipe in recipes" :key="recipe.id">{{ recipe }}</li>
    </ul> -->
  </div>
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
// import debounce from "@/util/debounce";

export default {
  name: "Explore",
  data: () => ({
    selectedValue: null,
    getIngredient: null,
  }),
  computed: {
    ...mapGetters({
      recipes: "getRecipesByIngredient",
      selectedIngredients: "getSelectedIngredients",
      suggestions: "getIngredientSuggestions",
      suggestionsIsLoading: "getSuggestionsIsLoading",
    }),
  },
  methods: {
    ...mapActions(["fetchRecipesByIngredient", "fetchIngredientSuggestions"]),
    ...mapMutations(["setSelectedIngredients"]),
    /* Push selected suggestion to selectedIngredients */
    setIngredients(ingredient) {
      this.setSelectedIngredients(ingredient);
    },
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

      this.fetchIngredientSuggestions(value);
    },
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
