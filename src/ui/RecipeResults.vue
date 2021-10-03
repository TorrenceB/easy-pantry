<template>
  <v-container fluid fill-height>
    <v-row class="justify-center">
      <v-progress-circular
        v-if="isLoadingResults"
        indeterminate
        color="primary"
        size="60"
      ></v-progress-circular>
      <ul v-else>
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
  async created() {
    await this.fetchItalianResults();

    this.isLoadingResults = false;
  },
};
</script>
