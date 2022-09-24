<template>
  <v-container class="text-left">
    <h2 class="text-md-h4">Featured Recipe</h2>
    <Recipe :recipe="featuredRecipe" />
    <div class="d-flex flex-wrap mt-4" v-if="featuredRecipe.diets">
      <v-chip
        v-for="diet in featuredRecipe.diets"
        :key="diet.index"
        class="text-h6 mr-2 mb-4"
        color="#E27D60"
        outlined
        >{{ diet.toUpperCase() }}</v-chip
      >
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import Recipe from "@/components/Recipe";

export default {
  name: "Featured",
  components: {
    Recipe,
  },
  methods: {
    ...mapActions("featured", ["fetchFeatured", "get"]),
    ...mapMutations("featured", { setRecipe: "setFeaturedRecipeState" }),

    init() {
      if (Object.entries(this.featuredRecipe).length === 0) {
        this.get(639628);
      }
    },
  },
  computed: {
    ...mapGetters("featured", ["featuredRecipe"]),
  },
  created() {
    this.init();
  },
};
</script>

<style scoped></style>
