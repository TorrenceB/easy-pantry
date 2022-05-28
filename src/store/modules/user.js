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
     *
     * @returns { promise }
     */
    async signUp({ userName, password, attributes: { email } } = {}) {
      try {
        const { user } = Auth.signUp({
          userName,
          password,
          attributes: {
            email,
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
