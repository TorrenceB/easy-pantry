<template>
  <v-card class="my-4" shaped>
    <v-img :src="recipe.image" height="150"> </v-img>
    <v-card-title>{{ recipe.title }}</v-card-title>
    <v-card-subtitle class="bucket-wrapper">
      <div
        v-for="(metric, metricName) in recipeMetrics"
        :key="metricName"
        class="d-flex flex-column justify-center align-center bucket-bg-color rounded"
      >
        <strong class="text-h5 text--primary font-weight-bold pt-1">{{
          metric
        }}</strong>
        <span v-if="metric" class="text-caption text--primary pb-1">{{
          metricName
        }}</span>
      </div>
    </v-card-subtitle>
    <v-row class="d-flex justify-center my-1 mx-4">
      <v-btn
        @click="favoritesButton.action"
        color="#41b3a3"
        width="100%"
        outlined
        large
      >
        <v-icon size="28">{{ favoritesButton.icon }}</v-icon>
        <span class="px-2">{{ favoritesButton.text }}</span>
      </v-btn>
    </v-row>
    <v-card-text
      v-html="recipe.summary"
      class="text-body-2"
      :class="{ 'text-truncate': truncate }"
    ></v-card-text>
    <v-card-actions class="d-flex justify-space-between">
      <v-btn color="primary" text
        ><a :href="recipe.sourceUrl">View Recipe</a></v-btn
      >
      <v-btn @click="toggleTruncate" color="primary" text
        ><span v-if="truncate">See More</span
        ><span v-else>See Less</span></v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Recipe",
  props: {
    recipe: {
      type: Object,
      default: () => {},
    },
    defaultTruncateState: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    truncate: true,
  }),
  computed: {
    ...mapGetters("user", { favorites: "getUserFavorites" }),
    recipeAlreadyFavorited() {
      if (this.favorites) {
        return this.favorites.some(
          ({ id }) => this.recipe.id.toString() === id
        );
      } else {
        return [];
      }
    },
    favoritesButton() {
      if (!this.recipeAlreadyFavorited) {
        return {
          action: this.addFavorite,
          icon: "mdi-heart-outline",
          text: "Add to Favorites",
        };
      } else {
        return {
          action: this.removeFavorite,
          icon: "mdi-trash-can-outline",
          text: "Remove from Favorites",
        };
      }
    },
    recipeMetrics() {
      const metricData = Object.entries(this.recipe).filter(([key, value]) => {
        const metrics = {
          readyInMinutes: value,
          healthScore: value,
          servings: value,
          aggregateLikes: value,
        };

        if (Object.hasOwn(metrics, key)) {
          return metrics[key];
        }
      });

      const {
        aggregateLikes,
        servings,
        readyInMinutes,
        healthScore,
      } = Object.fromEntries(metricData);

      return {
        Likes: aggregateLikes,
        Servings: servings,
        "Prepare(Min)": readyInMinutes,
        "Health Score": healthScore,
      };
    },
  },
  methods: {
    ...mapActions("user", ["createFavorite", "deleteFavorite"]),
    toggleTruncate() {
      this.truncate = !this.truncate;
    },
    async addFavorite() {
      const { message, status } = await this.createFavorite(this.recipe);

      if (status === "created") {
        this.showToast(message, "success");
      } else if (status === "error") {
        this.showToast(message, "error");
      }
    },
    async removeFavorite() {
      const { message, status } = await this.deleteFavorite(this.recipe);

      if (status === "deleted") {
        this.showToast(message, "info");
      } else if (status === "error") {
        this.showToast(message, "error");
      }
    },
    showToast(message, type) {
      this.$toast(message, {
        timeout: 3000,
        type: type,
        position: "bottom-center",
      });
    },
  },
  created() {
    this.truncate = this.defaultTruncateState;
  },
};
</script>
<style scoped>
.bucket-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr;
  column-gap: 0.25rem;
  margin-top: 0.5rem;
}

.bucket-bg-color {
  background: rgb(65, 179, 163);
}
</style>
