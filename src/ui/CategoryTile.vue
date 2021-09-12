<template>
  <v-card :color="color" height="200px" @click="pushToRecipeListRoute">
    <div class="text-center">
      <v-icon class="text-white" size="75">{{ icon }}</v-icon>
      <v-card-title class="text-white justify-center">{{ title }}</v-card-title>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "CategoryTile",
  props: {
    title: {
      type: String,
    },
    icon: {
      type: String,
    },
    color: {
      type: String,
    },
    pushToRecipeListRoute: {
      type: Function,
    },
  },
};
</script>

<style scoped>
.text-white {
  color: #fff;
}
</style>
