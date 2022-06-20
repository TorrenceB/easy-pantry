<template>
  <div v-if="isAuthenticated">
    <v-bottom-navigation class="bottom-nav" app grow
      ><button
        v-for="button in buttons"
        :key="button.button"
        class="button"
        :class="{ active: active === button.button }"
        @click="toggleActive(button)"
      >
        <router-link class="link" :to="button.to"
          ><SvgLoader
            :svg="button.svg"
            :styles="{
              height: '20',
              width: '20',
              fill: active === button.button ? 'black' : 'white',
            }"
            class="margin-right-quarter"
          />{{ button.button }}</router-link
        >
      </button>
    </v-bottom-navigation>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";

import SvgLoader from "@/components/SvgLoader.vue";

export default {
  name: "BottomNav",
  components: {
    SvgLoader,
  },
  data: () => ({
    buttons: [
      { button: "Home", to: "/", svg: "home" },
      {
        button: "Explore",
        to: "/explore",
        svg: "chineseFood",
      },
    ],
  }),
  computed: {
    ...mapGetters({ active: "getActivePage" }),
    ...mapGetters("user", { isAuthenticated: "getAuthenticatedState" }),
  },
  methods: {
    ...mapMutations(["updateActivePage"]),
    toggleActive({ button }) {
      this.updateActivePage(button);
    },
  },
  created() {
    this.updateActivePage("Home");
  },
};
</script>
<style scoped>
.bottom-nav {
  display: flex;
  justify-content: space-around;
  justify-items: center;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35%;
  height: 100%;
  color: #fff;
  font-weight: bolder;
  background-color: rgb(65, 179, 163);
}

.active {
  color: black;
  background-color: #fff;
  transition: all 250ms ease-in-out;
  width: 100%;
}

.link {
  display: flex;
  justify-items: center;
  text-decoration: none;
  margin: auto;
  color: inherit;
}

.margin-right-quarter {
  margin-right: 0.25rem;
}
</style>
