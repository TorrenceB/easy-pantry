<template>
  <v-container class="text-center">
    <v-toolbar>
      <v-text-field prepend-icon="mdi-magnify" rounded></v-text-field>
    </v-toolbar>
    <h2>Featured Recipe</h2>
    <v-card>
      <v-img
        src="https://restaurantden.com/wp-content/uploads/2017/09/free-stock-food-photography-websites.jpg"
      ></v-img>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Featured",
};
</script>
