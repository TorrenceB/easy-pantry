<template>
  <v-card class="my-4" shaped>
    <v-img :src="recipe.image" height="150"></v-img>
    <v-card-title>{{ recipe.title }}</v-card-title>
    <v-card-subtitle class="bucket-wrapper">
      <div
        v-for="(metric, metricName) in recipeMetrics"
        :key="metric"
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
    <v-card-text v-html="recipe.summary" class="text-body-2"></v-card-text>
    <v-card-actions>
      <v-btn color="primary" text
        ><a :href="recipe.sourceUrl">View Recipe</a></v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: "Recipe",
  props: {
    recipe: {
      type: Object,
      default: () => {},
    },
  },
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
        Prepare: readyInMinutes,
        "Health Score": healthScore,
      };
    },
  },
};
</script>
<style scoped>
.bucket-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr;
  column-gap: 0.25rem;
  margin-top: 0.25rem;
}

.bucket-bg-color {
  background: rgb(65, 179, 163);
}
</style>
