<template>
  <v-card>
    <v-img :src="recipe.image" height="150"></v-img>
    <v-card-title>{{ recipe.title }}</v-card-title>
  </v-card>
</template>
<script>
export default {
  name: "Recipe",
  props: {
    recipe: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
<style scoped></style>
