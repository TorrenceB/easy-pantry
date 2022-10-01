<template>
  <div v-if="isAuthenticated">
    <v-card>
      <v-navigation-drawer v-model="drawer" app>
        <v-card class="d-flex flex-column align-center pt-2">
          <v-avatar color="teal" size="64"
            ><span class="text-h5">{{ userInitials }}</span></v-avatar
          >
          <v-card-title v-if="user">
            {{ user.firstName }} {{ user.lastName }}</v-card-title
          >
          <v-card-subtitle v-if="user">{{ user.email }}</v-card-subtitle>
        </v-card>
        <v-list height="100%" nav class="mt-8">
          <v-list-item width="100%">
            <button @click="go('landing')" class="button">
              <v-icon class="pl-6 pr-2">mdi-food-apple-outline</v-icon>Cuisines
            </button>
          </v-list-item>
          <v-list-item width="100%">
            <button @click="go('favorites')" class="button">
              <v-icon class="pl-6 pr-2">mdi-heart-outline</v-icon>
              My Favorites
            </button>
          </v-list-item>
          <v-list-item width="100%">
            <button @click="go('profile')" class="button">
              <v-icon class="pl-6 pr-2">mdi-account-circle-outline</v-icon>
              Profile
            </button>
          </v-list-item>
          <v-list-item width="100%">
            <button @click="handleSignOut" class="button">
              <v-icon class="pl-6 pr-2">mdi-logout-variant</v-icon>Sign Out
            </button>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
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
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    drawer: null,
  }),
  computed: {
    ...mapGetters("auth", { isAuthenticated: "getAuthenticatedState" }),
    ...mapGetters("user", { user: "getUser" }),
    userInitials() {
      if (this.user) {
        const first = this.user.firstName.charAt(0);
        const last = this.user.lastName.charAt(0);

        return `${first}${last}`;
      } else {
        return null;
      }
    },
  },
  methods: {
    ...mapActions("auth", ["signOut"]),
    go(name) {
      const route = {
        landing: "Landing",
        favorites: "Favorites",
        profile: "Profile",
      };
      this.$router.push({ name: route[name] });
    },
    async handleSignOut() {
      try {
        await this.signOut();

        this.$router.push({ name: "SignIn" });
        this.drawer = false;
      } catch (err) {
        console.error("!", "handleSignOut:Drawer.vue", err);
      }
    },
  },
};
</script>
<style scoped>
.font-lg {
  font-size: 2.5em;
}

.button {
  display: flex;
  align-items: center;
  width: 100%;
  height: 3rem;
  color: #fff;
  font-weight: bolder;
  background-color: rgb(65, 179, 163);
  border-radius: 0.75rem;
}
</style>
