<template>
  <div>
    <form class="d-flex flex-column justify-center align-center">
      <input class="input" v-model="user.firstName" placeholder="First Name" />
      <input class="input" v-model="user.lastName" placeholder="Last Name" />
      <input class="input" v-model="user.userName" placeholder="Username" />
      <input class="input" v-model="user.email" placeholder="Email" />
      <input class="input" v-model="user.password" placeholder="Password" />

      <button @click="handleSignUp" class="button">
        Submit
      </button>
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
      userName: "",
      email: "",
      password: "",
    },
  }),
  methods: {
    ...mapActions("user", ["signUp"]),
    handleSignUp() {
      const user = {
        username: this.user.userName,
        password: this.user.password,
        name: this.fullName,
        email: this.user.email,
      };

      console.log({ user });
      this.signUp(user);
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
</style>
