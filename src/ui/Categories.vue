<template>
  <v-container>
    <h2 class="text-center pb-4">Choose a cuisine</h2>
    <v-row class="d-flex">
      <v-col cols="6" v-for="category in categories" :key="category.index">
        <CategoryTile
          :title="category.title"
          :color="category.color"
          :icon="category.icon"
          :pushToRecipeListRoute="fetchSeafoodResults"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CategoryTile from "@/ui/CategoryTile";
import { mapActions } from "vuex";

export default {
  name: "Categories",
  components: {
    CategoryTile,
  },
  methods: {
    ...mapActions([
      "fetchItalianResults",
      "fetchMexicanResults",
      "fetchSeafoodResults",
    ]),
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
        route: {},
      },
      {
        title: "Seafood",
        icon: "mdi-fish",
        color: "#C38D9E",
        route: {},
      },
      {
        title: "Mediterranean",
        icon: "mdi-fruit-grapes-outline",
        color: "#69DDFF",
        route: {},
      },
      {
        title: "French",
        icon: "mdi-chef-hat",
        color: "#85DCBA",
        route: {},
      },
      {
        title: "Vegetarian",
        icon: "mdi-chili-mild",
        color: "#BFEDC1",
        route: {},
      },
      {
        title: "Greek",
        icon: "mdi-alphabet-greek",
        color: "#582630",
        route: {},
      },
      {
        title: "Quick & Easy",
        icon: "mdi-bike-fast",
        color: "#AD2E24",
        route: {},
      },
      {
        title: "Vegan",
        icon: "mdi-food-apple",
        color: "#69DDFF",
        route: {},
      },
    ],
  }),
};
</script>
