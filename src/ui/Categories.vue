<template>
  <v-container>
    <h2 class="text-center pb-4">Choose a cuisine</h2>
    <v-row class="d-flex">
      <v-col cols="6" v-for="category in categories" :key="category.index">
        <CategoryTile
          :title="category.title"
          :color="category.color"
          :icon="category.icon"
          :pushToRecipeListRoute="category.route"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CategoryTile from "@/ui/CategoryTile";
import router from "@/router/index";

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
        route: () =>
          router.push({
            name: "results",
            params: {
              category: "italian",
            },
          }),
      },
      {
        title: "Mexican",
        icon: "mdi-taco",
        color: "#41B3A3",
        route: () =>
          router.push({
            name: "results",
            params: {
              category: "mexican",
            },
          }),
      },
      {
        title: "Seafood",
        icon: "mdi-fish",
        color: "#C38D9E",
        route: () =>
          router.push({
            name: "results",
            params: {
              category: "seafood",
            },
          }),
      },
      {
        title: "Mediterranean",
        icon: "mdi-fruit-grapes-outline",
        color: "#69DDFF",
        route: () => null,
      },
      {
        title: "Vegan",
        icon: "mdi-food-apple",
        color: "#85DCBA",
        route: () => null,
      },
      {
        title: "Vegetarian",
        icon: "mdi-chili-mild",
        color: "#BFEDC1",
        route: () => null,
      },
      {
        title: "Greek",
        icon: "mdi-alphabet-greek",
        color: "#582630",
        route: () => null,
      },
      {
        title: "Quick & Easy",
        icon: "mdi-bike-fast",
        color: "#AD2E24",
        route: () => null,
      },
    ],
  }),
};
</script>
