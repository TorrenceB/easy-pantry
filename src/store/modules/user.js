import { Auth } from "aws-amplify";

/* TODO
  - Update signup flow to include fields for:
    - FirstName
    - LastName
    - Email
    - Username
  - User Object: 
    - FirstName
    - LastName
    - Email
    - Username
    - cognitoID
    - favorites
*/
export default {
  namespaced: true,
  state: () => ({
    user: null,
    authState: false,
  }),
  getters: {
    getUser: (state) => state.user,
    getAuthState: (state) => state.authState,
  },
  actions: {
    /**
     * @function fetchUser
     *
     * @returns { promise }
     */
    async fetchUser({ commit }) {
      try {
        const user = await Auth.currentAuthenticatedUser();
        console.log("User: ", user);

        commit("updateUser", user);
        commit("updateAuthState", true);
      } catch (e) {
        console.error(e);

        commit("updateAuthState", false);
      }
    },

    /**
     * @function signup
     * @param { object } user
     *
     * @returns { promise }
     */
    async signUp({ username, password, name, email } = {}) {
      console.log({ username, password, name, email });
      try {
        const { user } = await Auth.signUp({
          username,
          password,
          attributes: {
            name,
            email,
            preferred_username: username,
          },
        });

        console.log({ user });
      } catch (e) {
        console.error(e);
      }
    },
  },
  mutations: {
    updateUser: (state, user) => (state.user = user),
    updateAuthState: (state, authState) => (state.authState = authState),
  },
};
