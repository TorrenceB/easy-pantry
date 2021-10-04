<template>
  <v-container fluid fill-height>
    <v-row class="justify-center">
      <v-progress-circular
        v-if="isLoadingResults"
        indeterminate
        color="primary"
        size="60"
      ></v-progress-circular>
      <v-card v-else>
        <v-img
          src="https://spoonacular.com/recipeImages/715769-312x231.jpg"
        ></v-img>
        <v-card-title>Broccolini Quinoa Pilaf</v-card-title>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "RecipeResults",
  data: () => ({
    isLoadingResults: false,
  }),
  computed: { ...mapGetters(["getItalianResults"]) },
  methods: { ...mapActions(["fetchItalianResults"]) },
  // async created() {
  //   await this.fetchItalianResults();

  //   this.isLoadingResults = false;
  // },
};
</script>
