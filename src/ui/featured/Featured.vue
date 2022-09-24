<template>
  <v-container class="text-left">
    <h2 class="pb-4 text-md-h4">Featured Recipe</h2>
    <Recipe :recipe="featuredRecipe" />
    <div class="flex mt-4" v-if="featuredRecipe.diets">
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
  data: () => ({
    bookmarkIsChecked: false,
  }),
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

<style scoped>
.bucket-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr;
  column-gap: 0.25rem;
}

.bucket-bg-color {
  background: rgb(65, 179, 163);
}

.flex-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.flex {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
}

.card {
  position: relative;
  margin: 0.5em 0;
}

.card_title {
  display: flex;

  font-weight: 800;
  font-size: large;
}

.card_image {
  opacity: 0.5;
  border-radius: 0.5em;
}

.card_favorite-icon {
  z-index: 10;
  position: absolute;
  right: 1.5em;
  top: 1em;
}

.card_footer-container {
  z-index: 10;
  position: absolute;
  bottom: 0;
  margin: 1em 0;
  padding: 0 1.5em;

  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
</style>
