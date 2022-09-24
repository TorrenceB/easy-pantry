<template>
  <div class="empty-state__container">
    <lottie-vue-player
      :src="vegetableAnimation.animation"
      :background-color="vegetableAnimation.options.backgroundColor"
      :style="vegetableAnimation.options.styles"
      loop
      autoplay
    >
    </lottie-vue-player>
    <div class="d-flex flex-column align-center">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import animation from "@/assets/animations/vegetables";

export default {
  name: "EmptyState",
  data: () => ({
    vegetableAnimation: {
      animation: JSON.stringify(animation),
      options: {
        backgroundColor: "#121212",
        styles: {
          all: "unset",
          height: "none",
        },
      },
    },
  }),
};
</script>
<style scoped>
.empty-state__container {
  height: 12.5rem;
}
</style>
