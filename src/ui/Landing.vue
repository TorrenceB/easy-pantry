<template>
  <v-container>
    <!-- <Featured /> -->
    <RecipeCarousel />
  </v-container>
</template>

<script>
// import Featured from "@/ui/Featured";
import RecipeCarousel from "@/ui/RecipeCarousel";

export default {
  name: "Landing",
  components: { RecipeCarousel },

  data: () => ({
    //
  }),
};
</script>
