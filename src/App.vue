<template>
  <v-app>
    <v-app-bar dark app>
      <v-app-bar-nav-icon class="font-lg"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-app-bar-title class="font-lg">Easy Pantry</v-app-bar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
.font-lg {
  font-size: 2.5em;
}
</style>
