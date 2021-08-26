<template>
  <v-container>
    <Featured />
    <!-- <recipe-carousel></recipe-carousel> -->
  </v-container>
</template>

<script>
import Featured from "@/ui/Featured";
// import RecipeCarousel from "@/ui/RecipeCarousel";

export default {
  name: "Landing",
  components: { Featured },

  data: () => ({
    //
  }),
};
</script>
