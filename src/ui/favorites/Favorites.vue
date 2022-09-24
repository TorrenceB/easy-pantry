<template>
  <v-container fluid>
    <EmptyState v-if="favorites.length === 0">
      <div class="px-8 text-center">
        <h3 class="text-h6 text--primary my-2">
          You have no favorites at the moment.
        </h3>
        <p class="text-subtitle-2 text--secondary">
          To add a recipe to your favorites, simply search for a recipe in the
          "Explore" secion then select "Add to Favorites" on any one of the
          recipe results.
        </p>
      </div>
    </EmptyState>
    <div v-else class="d-flex flex-column p-4">
      <v-row class="d-flex my-2">
        <v-btn @click="$router.go(-1)" width="5" text
          ><v-icon>mdi-arrow-left-circle-outline</v-icon></v-btn
        >
        <h2>My Favorites</h2>
      </v-row>
      <Recipe v-for="recipe in favorites" :key="recipe.id" :recipe="recipe" />
    </div>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";

import Recipe from "@/components/Recipe";
import EmptyState from "@/components/EmptyState";

export default {
  name: "Favorites",
  components: {
    Recipe,
    EmptyState,
  },
  computed: {
    ...mapGetters("user", { favorites: "getUserFavorites" }),
  },
};
</script>
<style scoped></style>
