<template>
  <v-app>
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
        <v-spacer></v-spacer>
        <v-app-bar-title class="font-lg">Easy Pantry</v-app-bar-title>
        <v-spacer></v-spacer>
      </v-app-bar>
      <v-main>
        <router-view />
      </v-main>
    </div>
  </v-app>
</template>

<script>
import { Auth } from "aws-amplify";
import { components, AmplifyEventBus } from "aws-amplify-vue";

export default {
  name: "App",
  components: {
    ...components,
  },
  data: () => ({
    isSignedIn: false,
    drawer: null,
  }),
  created() {
    this.findUser();

    AmplifyEventBus.$on("authState", (info) => {
      if (info === "signedIn") {
        this.findUser();
      } else {
        this.isSignedIn = false;
      }
    });
  },
  methods: {
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

<style>
.font-lg {
  font-size: 2.5em;
}

.center {
  margin: auto;
}
</style>
