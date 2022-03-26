<template>
  <div class="center">
    <h1 class="text-center font-xxx-large">Easy Pantry</h1>
    <p class="text-center font-small font-opacity px-10 mt-2 mb-0">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta commodi
      harum recusandae ex maiores omnis debitis dolorem voluptatibus
      consequuntur nemo?
    </p>
    <lottie-vue-player
      autoplay
      loop
      :background-color="animationOptions.backgroundColor"
      :style="animationOptions.styles"
      :src="lottieAnimation"
    >
    </lottie-vue-player>
    <button class="button mt-2">Get Cookin'</button>
  </div>
</template>
<script>
import animation from "@/assets/animations/wok-pan.json";

export default {
  name: "Splash",
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

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 4rem;

  background-color: #85dcba;
  font-size: 1.3rem;
  font-weight: 700;

  border-radius: 0.7rem;
}
</style>
