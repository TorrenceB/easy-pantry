import { Auth, API, graphqlOperation } from "aws-amplify";
import { createUser } from "@/graphql/mutations.js";

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

        if (user) {
          /* find user in db using userSub and commit to state  */
          // commit("updateUser", user);
        }

        commit("updateAuthState", true);
      } catch (e) {
        console.error(e);

        commit("updateAuthState", false);
      }
    },

    /**
     * @async
     *
     * @function signup
     * @param { object } user
     *
     * @returns { promise }
     */
    async signUp(
      { commit },
      { username, password, firstName, lastName, email } = {}
    ) {
      try {
        const { user, userSub } = await Auth.signUp({
          username,
          password,
          attributes: {
            email,
            name: `${firstName} ${lastName}`,
            preferred_username: username,
          },
        });

        /* Create user in db */
        const dbUser = {
          id: userSub,
          userName: user.username,
          firstName: firstName,
          lastName: lastName,
          email: email,
        };

        /* commit createUser mutation */
        const {
          data: { createUser: newUser },
        } = await API.graphql(graphqlOperation(createUser, { input: dbUser }));

        console.log(newUser);

        commit("updateUser", newUser);
      } catch (e) {
        console.error(e);
      }
    },

    /**
     * @async
     *
     * @function signIn
     * @param { object } user
     *
     * @returns { promise }
     */
    async signIn() {},

    /**
     * @async
     * @function signOut
     *
     * @returns { promise }
     */
    async signOut() {},
  },
  mutations: {
    updateUser: (state, user) => (state.user = user),
    updateAuthState: (state, authState) => (state.authState = authState),
  },
};
