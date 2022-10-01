<template>
  <v-container class="text-left">
    <h2 class="text-md-h4">From Your Favorites</h2>
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
        if (this.user.favorites && this.user.favorites.items.length > 0) {
          const id = this.pickFeaturedFromFavorites();

          this.get(id);
        } else {
          this.fetchFeatured();
        }
      }
    },
    pickFeaturedFromFavorites() {
      const favorites = this.user.favorites.items;
      const { id } = favorites[
        Math.floor(Math.random() * favorites.length) ?? 0
      ];

      return id;
    },
  },
  computed: {
    ...mapGetters("featured", ["featuredRecipe"]),
    ...mapGetters("user", { user: "getUser" }),
  },
  created() {
    this.init();
  },
};
</script>

<style scoped></style>
