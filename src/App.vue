<template>
  <v-app>
    <Splash :isLoading="isLoading" />
    <div v-if="!isLoading" :class="{ fadein: !isLoading }">
      <div v-if="!isSignedIn" class="center">
        <amplify-authenticator> </amplify-authenticator>
      </div>
      <div v-if="isSignedIn">
        <v-navigation-drawer v-model="drawer" app>
          <v-list
            class="d-flex flex-column justify-end align-center"
            height="100%"
          >
            <v-list-item>
              <amplify-sign-out></amplify-sign-out>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-app-bar dark app>
          <v-app-bar-nav-icon
            @click.stop="drawer = !drawer"
            class="font-lg"
          ></v-app-bar-nav-icon>
          <v-app-bar-title class="text-xs font-weight-bold"
            >Easy Pantry</v-app-bar-title
          >
          <v-spacer></v-spacer>
        </v-app-bar>
        <v-main>
          <router-view v-slot="{ Component }">
            <transition name="slide-left">
              <component :is="Component" />
            </transition>
          </router-view>
        </v-main>
        <v-bottom-navigation class="bottom-nav" app grow
          ><v-button
            v-for="button in buttons"
            :key="button.button"
            class="button"
            :class="{ active: active === button.button }"
            @click="toggleActive(button)"
            ><router-link class="link" :to="button.to"
              ><SvgLoader
                :svg="button.svg"
                :styles="{
                  height: '20',
                  width: '20',
                  fill: active === button.button ? 'black' : 'white',
                }"
                class="margin-right-quarter"
              />{{ button.button }}</router-link
            ></v-button
          >
        </v-bottom-navigation>
      </div>
    </div>
  </v-app>
</template>

<script>
/* TODO
  - fetchMeAMeal feature
  - Add ingredients, return meal
*/

import { Auth } from "aws-amplify";
import { components, AmplifyEventBus } from "aws-amplify-vue";
import { mapGetters, mapMutations } from "vuex";

import Splash from "@/ui/Splash";
import SvgLoader from "@/components/SvgLoader.vue";

export default {
  /* Todo: Fix routing on active property */
  name: "App",
  components: {
    ...components,
    Splash,
    SvgLoader,
  },
  data: () => ({
    isSignedIn: false,
    isLoading: true,
    drawer: null,
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
  },

  created() {
    setTimeout(() => {
      this.isLoading = false;
      this.findUser();

      AmplifyEventBus.$on("authState", (info) => {
        if (info === "signedIn") {
          this.findUser();
        } else {
          this.isSignedIn = false;
        }
      });
    }, 6000);

    this.updateActivePage("Home");
  },
  methods: {
    ...mapMutations(["updateActivePage"]),
    toggleActive({ button }) {
      this.updateActivePage(button);
    },
    async findUser() {
      try {
        const user = Auth.currentAuthenticatedUser();

        user.then((res) => {
          this.isSignedIn = true;

          console.log(res);
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.font-lg {
  font-size: 2.5em;
}

.center {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.bottom-nav {
  display: flex;
  justify-content: space-around;
  justify-items: center;
}

.button {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-weight: bolder;
  color: #fff;
}

.margin-right-quarter {
  margin-right: 0.25rem;
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

.container {
  padding: 0;
}

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
