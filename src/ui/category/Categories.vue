<template>
  <v-container>
    <h2 class="text-center pb-4">Choose a cuisine</h2>
    <v-row class="d-flex">
      <v-col cols="6" v-for="category in categories" :key="category.index">
        <CategoryTile
          :title="category.title"
          :color="category.color"
          :icon="category.icon"
          :params="category.params"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CategoryTile from "@/ui/category/CategoryTile";

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
        params: {
          category: "italian",
        },
      },
      {
        title: "Mexican",
        icon: "mdi-taco",
        color: "#41B3A3",
        params: {
          category: "mexican",
        },
      },
      {
        title: "Seafood",
        icon: "mdi-fish",
        color: "#C38D9E",
        params: {
          category: "seafood",
        },
      },
      {
        title: "Mediterranean",
        icon: "mdi-fruit-grapes-outline",
        color: "#69DDFF",
        params: {
          category: "mediterranean",
        },
      },
      {
        title: "Vegan",
        icon: "mdi-food-apple",
        color: "#85DCBA",
        params: {
          category: "vegan",
        },
      },
      {
        title: "Vegetarian",
        icon: "mdi-chili-mild",
        color: "#BFEDC1",
        params: {
          category: "vegetarian",
        },
      },
      {
        title: "Greek",
        icon: "mdi-alphabet-greek",
        color: "#582630",
        params: {
          category: "greek",
        },
      },
      {
        title: "Quick & Easy",
        icon: "mdi-bike-fast",
        color: "#AD2E24",
        params: {
          category: "quick",
        },
      },
    ],
  }),
};
</script>
