<template>
  <v-container>
    <h2 class="text-center pb-4">Choose a cuisine</h2>
    <v-row class="d-flex">
      <CategoryTile title="Italian" color="#E27D60" icon="mdi-pasta" />
      <CategoryTile title="Mexican" color="#41B3A3" icon="mdi-taco" />
    </v-row>
  </v-container>
</template>

<script>
import CategoryTile from "@/ui/CategoryTile";

export default {
  name: "Categories",
  components: {
    CategoryTile,
  },
};
</script>
