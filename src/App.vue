<template>
  <v-app>
    <amplify-authenticator class="center">
      <v-app-bar dark app>
        <v-app-bar-nav-icon class="font-lg"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-app-bar-title class="font-lg">Easy Pantry</v-app-bar-title>
        <v-spacer></v-spacer>
      </v-app-bar>
      <v-main>
        <router-view />
      </v-main>
      <amplify-sign-in></amplify-sign-in>
    </amplify-authenticator>
  </v-app>
</template>

<script>
import { components } from "aws-amplify-vue";

export default {
  name: "App",
  components: {
    ...components,
  },
};
</script>

<style>
.font-lg {
  font-size: 2.5em;
}

.center {
  margin: auto;
}
</style>
