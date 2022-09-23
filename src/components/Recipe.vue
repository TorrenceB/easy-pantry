<template>
  <v-card class="my-4" shaped>
    <v-img :src="recipe.image" height="150">
      <!-- <v-row class="d-flex mt-auto">
        <div class="rounded border border-white px-4 pt-2">
          <v-btn color="green" outlined>
            <v-icon size="44">mdi-heart-outline</v-icon> Add To Favorites
          </v-btn>
        </div>
      </v-row> -->
    </v-img>
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
        @click="addToFavorites"
        color="#41b3a3"
        width="100%"
        outlined
        large
      >
        <v-icon size="28">mdi-heart-outline</v-icon>
        <span class="px-2">Add To Favorites</span>
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
import { mapActions } from "vuex";

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
    ...mapActions("user", ["setFavorites"]),
    toggleTruncate() {
      this.truncate = !this.truncate;
    },
    async addToFavorites() {
      const { status, message } = await this.setFavorites(this.recipe);

      if (status === "added") {
        this.$toast(message, {
          timeout: 3000,
          type: "success",
          position: "bottom-center",
        });
      } else if (status === "alreadyFavorited") {
        this.$toast(message, {
          timeout: 3000,
          type: "info",
          position: "bottom-center",
        });
      }
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
