<template>
  <v-app>
    <Splash :isLoading="isLoading" />
    <div v-if="!isLoading" :class="{ fadein: !isLoading }">
      <div v-if="!isAuthenticated" class="center">
        <SignUp v-if="!toggle" />
        <SignIn v-if="toggle" />

        <button @click="toggle = !toggle" class="button">Toggle Auth</button>
      </div>
      <div v-if="isAuthenticated">
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
import { components, AmplifyEventBus } from "aws-amplify-vue";
import { mapGetters, mapMutations, mapActions } from "vuex";

import SignUp from "@/ui/authentication/SignUp.vue";
import SignIn from "@/ui/authentication/SignIn.vue";
import Splash from "@/ui/Splash";
import SvgLoader from "@/components/SvgLoader.vue";

export default {
  name: "App",
  components: {
    ...components,
    Splash,
    SvgLoader,
    SignUp,
    SignIn,
  },
  data: () => ({
    isLoading: true,
    toggle: false,
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
    ...mapGetters("user", { isAuthencated: "getAuthenticatedState" }),
  },

  created() {
    setTimeout(() => {
      this.isLoading = false;

      AmplifyEventBus.$on("authState", (info) => {
        console.log(info);

        if (info === "signedIn") {
          this.fetchUser();
        } else {
          this.updateAuthState(false);
        }
      });
    }, 6000);

    this.updateActivePage("Home");
  },
  methods: {
    init() {},
    ...mapActions("user", ["fetchUser"]),
    ...mapMutations(["updateActivePage"]),
    ...mapMutations("user", ["updateAuthState"]),
    toggleActive({ button }) {
      this.updateActivePage(button);
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
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35%;
  height: 3rem;
  color: #fff;
  font-weight: bolder;
  background-color: rgb(65, 179, 163);
  border-radius: 0.75rem;
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
