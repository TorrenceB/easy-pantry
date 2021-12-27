<template>
  <v-card :color="color" height="200px" @click="pushToResults(params)">
    <div class="text-center">
      <v-icon class="text-white mt-10" size="75">{{ icon }}</v-icon>
      <v-card-title class="text-white justify-center pa-0">{{
        title
      }}</v-card-title>
    </div>
  </v-card>
</template>

<script>
import router from "@/router/index";

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
    params: {
      type: Object,
    },
  },
  methods: {
    pushToResults(params) {
      return router.push({
        params,
        name: "results",
      });
    },
  },
};
</script>

<style scoped>
.text-white {
  color: #fff;
}
</style>
