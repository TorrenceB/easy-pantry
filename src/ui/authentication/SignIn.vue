<template>
  <div class="center">
    <h1>Login</h1>
    <form class="d-flex flex-column justify-center align-center">
      <input class="input" v-model="user.userName" placeholder="Username" />
      <input
        class="input"
        v-model="user.password"
        placeholder="Password"
        type="password"
      />

      <button @click="handleSignIn" class="button">
        <v-progress-circular
          v-if="isFetching"
          indeterminate
        ></v-progress-circular>
        <span v-else>Login</span>
      </button>

      <div class="d-flex mt-4">
        <p class="mx-2">New to Easy Pantry?</p>
        <router-link to="/signUp">Sign Up</router-link>
      </div>
    </form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "SignIn",
  data: () => ({
    user: {
      userName: "",
      password: "",
    },
  }),
  computed: {
    ...mapGetters("auth", { isFetching: "getIsFetching" }),
  },
  methods: {
    ...mapActions("auth", ["signIn"]),
    async handleSignIn() {
      const user = {
        userName: this.user.userName,
        password: this.user.password,
      };

      try {
        await this.signIn(user);

        this.$router.push({ name: "Landing" });
      } catch (err) {
        console.error("!", "handleSignIn:signIn.vue", err);
      }
    },
  },
};
</script>
<style scoped>
.input {
  width: 100%;
  padding: 0.75em;
  margin: 1em;
  border: 2px solid white;
  color: white;
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

.center {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
