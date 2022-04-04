<template>
  <div class="center overlay" :class="{ fadeout: !isLoading }">
    <h1 class="text-center font-xxx-large">Easy Pantry</h1>
    <p class="text-center font-small font-opacity px-10 mt-2 mb-0">
      Don't know what your next meal should be? You've come to the right place.
    </p>
    <lottie-vue-player
      autoplay
      loop
      :background-color="animationOptions.backgroundColor"
      :style="animationOptions.styles"
      :src="lottieAnimation"
    >
    </lottie-vue-player>
  </div>
</template>
<script>
import animation from "@/assets/animations/wok-pan.json";

export default {
  name: "Splash",
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    lottieAnimation: JSON.stringify(animation),
    animationOptions: {
      backgroundColor: "#121212",
      styles: {
        all: "unset",
        height: "none",
      },
    },
  }),
};
</script>
<style scoped>
.font-xxx-large {
  font-size: xxx-large;
}

.font-small {
  font-size: small;
}

.font-opacity {
  opacity: 0.6;
}

.text-center {
  text-align: center;
}

.overlay {
  position: absolute;
  z-index: 50;
}

.fadeout {
  animation: fadeout 3s forwards;
}

@keyframes fadeout {
  to {
    opacity: 0;
    visibility: hidden;
  }
}
</style>
