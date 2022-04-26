<template>
  <div class="center">
    <h1>Find me a Recipe</h1>
    <label for="ingredient-search" />
    <input
      v-model="ingredientSearchValue"
      class="input my-2"
      id="ingredient-search"
      placeholder="Example: Flour"
    />
    <!-- Suggestions -->
    <ul id="suggestions" class="suggestionsWrapper">
      <li
        class="suggestion"
        v-for="suggestion in suggestions"
        :key="suggestion.id"
      >
        {{ suggestion.name }}
      </li>
    </ul>

    <button @click="getIngredient()" class="button">
      <p class="flex">Search</p>
    </button>
    <ul>
      <li v-for="recipe in recipes" :key="recipe.id">{{ recipe }}</li>
    </ul>
  </div>
</template>
<script>
/* TODO
  1. Call getIngredient() onInput
  2. wrap getIngredient with a debounce function
  3. create dropdown & clickhandler for e.target.value
  4. add selected value to selected ingredients array
  5. Submit click handler: pass selectedIngredient list to fetchRecipes call
*/

import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "Explore",
  data: () => ({
    ingredientSearchValue: "",
  }),
  computed: {
    ...mapGetters({
      recipes: "getRecipesByIngredient",
      selectedIngredients: "getSelectedIngredients",
      suggestions: "getIngredientSuggestions",
    }),
  },
  methods: {
    ...mapActions(["fetchRecipesByIngredient", "fetchIngredientSuggestions"]),
    ...mapMutations(["setSelectedIngredients"]),
    /* Fetch suggestions */
    getIngredient() {
      this.fetchIngredientSuggestions(this.ingredientSearchValue);
    },
    /* Push selected suggestion to selectedIngredients */
    setIngredients(ingredient) {
      this.setSelectedIngredients(ingredient);
    },
    /* Fetch Recipes with selectedIngredients */
    getRecipes() {
      this.fetchRecipesByIngredient(this.selectedIngredients);
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

.suggestionsWrapper {
}

.suggestion {
}
</style>
