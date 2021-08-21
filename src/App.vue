<template>
  <v-app>
    <v-app-bar app>
      <v-spacer></v-spacer>
      <v-app-bar-title>Easy Pantry</v-app-bar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <v-toolbar>
        <v-text-field prepend-icon="mdi-magnify" rounded></v-text-field>
      </v-toolbar>
      <Featured />
    </v-main>
  </v-app>
</template>

<script>
import Featured from "@/ui/Featured";
export default {
  name: "App",
  components: { Featured },
  data: () => ({
    //
  }),
};
</script>
