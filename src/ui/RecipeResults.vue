<template>
  <v-container>
    <v-row class="justify-center">
      <v-progress-circular
        :v-show="isLoadingResults"
        indeterminate
        color="primary"
        size="60"
      ></v-progress-circular>
      <ul>
        <li v-for="result in getItalianResults" :key="result.id">
          {{ result }}
        </li>
      </ul>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "RecipeResults",
  data: () => ({
    isLoadingResults: true,
  }),
  computed: { ...mapGetters(["getItalianResults"]) },
  methods: { ...mapActions(["fetchItalianResults"]) },
    created() {
      this.fetchItalianResults();

      if (this.fetchItalianResults) {
        this.isLoadingResults = false;
      }
    },
};
</script>
