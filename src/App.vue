<template>
  <v-app>
    <Splash :isLoading="isLoading" />
    <div v-if="!isLoading" :class="{ fadein: !isLoading }">
      <Drawer />
      <v-main>
        <router-view v-slot="{ Component }">
          <transition name="slide-left">
            <component :is="Component" />
          </transition>
        </router-view>
      </v-main>
      <BottomNav />
    </div>
  </v-app>
</template>

<script>
import { components } from "aws-amplify-vue";

import Splash from "@/ui/Splash";
import Drawer from "@/components/Drawer.vue";
import BottomNav from "@/components/BottomNav.vue";

export default {
  name: "App",
  components: {
    ...components,
    Splash,
    Drawer,
    BottomNav,
  },
  data: () => ({
    isLoading: true,
  }),

  created() {
    setTimeout(() => {
      this.isLoading = false;
    }, 6000);
  },
  methods: {
    init() {},
  },
};
</script>

<style scoped>
.fadein {
  animation: fadeIn 5s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
