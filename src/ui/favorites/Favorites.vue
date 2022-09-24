<template>
  <v-container fluid>
    <div class="d-flex flex-column p-4">
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

export default {
  name: "Favorites",
  components: {
    Recipe,
  },
  computed: {
    ...mapGetters("user", { favorites: "getUserFavorites" }),
  },
};
</script>
<style scoped></style>
