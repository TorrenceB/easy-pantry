<template>
  <v-col cols="6">
    <v-card :color="color" height="200px">
      <div class="text-center">
        <v-icon class="text-white" size="75">{{ icon }}</v-icon>
        <v-card-title class="text-white justify-center">{{
          title
        }}</v-card-title>
      </div>
    </v-card>
  </v-col>
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
  },
};
</script>

<style scoped>
.text-white {
  color: #fff;
}
</style>
