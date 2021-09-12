<template>
  <v-container>
    <h2 class="text-center pb-4">Choose a cuisine</h2>
    <v-row class="d-flex">
      <v-col cols="6" v-for="category in categories" :key="category.index">
        <CategoryTile
          :title="category.title"
          :color="category.color"
          :icon="category.icon"
        />
      </v-col>
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
  data: () => ({
    categories: [
      {
        title: "Italian",
        icon: "mdi-pasta",
        color: "#E27D60",
      },
      {
        title: "Mexican",
        icon: "mdi-taco",
        color: "#41B3A3",
      },
    ],
  }),
};
</script>
