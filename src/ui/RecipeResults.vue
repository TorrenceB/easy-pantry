<template>
  <v-container fluid fill-height>
    <v-row class="justify-center">
      <v-progress-circular
        v-if="isLoadingResults"
        indeterminate
        color="primary"
        size="60"
      ></v-progress-circular>
      <div v-else>
        <h1 class="font-weight-bold">{{ "" }}</h1>
        <v-card
          v-for="result in getMexicanResults"
          :key="result.id"
          class="my-4"
          width="95%"
        >
          <v-row>
            <v-col>
              <v-avatar tile size="95%" class="ma-2">
                <v-img :src="result.image"></v-img>
              </v-avatar>
            </v-col>
            <v-col class="d-flex flex-column justify-center">
              <v-card-title class="font-weight-bold text-h5 pa-0">{{
                result.title
              }}</v-card-title>
              <v-card-text class="mt-6 text-subtitle-1 pa-0">
                View Recipe <v-icon>mdi-arrow-right</v-icon></v-card-text
              >
            </v-col>
          </v-row>
        </v-card>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "RecipeResults",
  props: {},
  data: () => ({
    isLoadingResults: false,
  }),
  computed: { ...mapGetters(["getItalianResults", "getMexicanResults"]) },
  methods: { ...mapActions(["fetchItalianResults", "fetchMexicanResults"]) },
  async created() {
    await this.fetchMexicanResults();

    this.isLoadingResults = false;
  },
};

/* 
  Object: Hey I am who I am, here's my ID, can you please 
  tell the doorman to situate the room appropriately to
  suite my needs?
*/
</script>

