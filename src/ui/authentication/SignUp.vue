<template>
  <div class="center">
    <h1>Register</h1>
    <form class="d-flex flex-column justify-center align-center">
      <input
        class="input"
        v-model="user.firstName"
        placeholder="First Name"
        name="firstName"
      />
      <input
        class="input"
        v-model="user.lastName"
        placeholder="Last Name"
        name="lastName"
      />
      <input
        class="input"
        v-model="user.username"
        placeholder="Username"
        name="username"
      />
      <input
        class="input"
        v-model="user.email"
        placeholder="Email"
        name="email"
      />
      <input
        class="input"
        v-model="user.password"
        placeholder="Password"
        type="password"
        name="password"
      />

      <button @click.prevent="handleSignUp" class="button">
        Submit
      </button>

      <div class="d-flex mt-4">
        <p class="mx-2">Already have an account?</p>
        <router-link to="/signIn">Sign In</router-link>
      </div>
    </form>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "SignUp",
  data: () => ({
    user: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    },
  }),
  methods: {
    ...mapActions("user", ["signUp"]),
    async handleSignUp() {
      const user = Object.entries(this.user).reduce(
        (userObj, [key, value] = []) => {
          userObj[key] = value;

          return userObj;
        },
        {}
      );

      try {
        await this.signUp(user);

        this.$router.push({ name: "SignIn" });
      } catch (err) {
        console.error("!", "handleSignUp:SignUp.vue", err);
      }
    },
  },
  computed: {
    fullName() {
      return `${this.user.firstName} ${this.user.lastName}`;
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
