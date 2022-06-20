<template>
  <div v-if="isAuthenticated">
    <v-navigation-drawer v-model="drawer" app>
      <v-list class="d-flex flex-column justify-end align-center" height="100%">
        <v-list-item class="w-full">
          <button @click="handleSignOut" class="button">Sign Out</button>
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
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    drawer: null,
  }),
  computed: {
    ...mapGetters("user", { isAuthenticated: "getAuthenticatedState" }),
  },
  methods: {
    ...mapActions("user", ["signOut"]),
    async handleSignOut() {
      try {
        await this.signOut();

        this.$router.push({ name: "SignIn" });
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

.w-full {
  width: 100%;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 3rem;
  color: #fff;
  font-weight: bolder;
  background-color: rgb(65, 179, 163);
  border-radius: 0.75rem;
}
</style>
