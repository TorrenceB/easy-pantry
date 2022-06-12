<template>
  <div>
    <form class="d-flex flex-column justify-center align-center">
      <input class="input" v-model="user.userName" placeholder="Username" />
      <input
        class="input"
        v-model="user.password"
        placeholder="Password"
        type="password"
      />

      <button @click="handleSignIn" class="button">
        Submit
      </button>
    </form>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "SignIn",
  data: () => ({
    user: {
      userName: "",
      password: "",
    },
  }),
  methods: {
    ...mapActions("user", ["signIn"]),
    handleSignIn() {
      const user = {
        userName: this.user.userName,
        password: this.user.password,
      };

      this.signIn(user);
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
</style>
