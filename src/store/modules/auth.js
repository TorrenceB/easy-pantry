import { Auth } from "aws-amplify";

export default {
  namespaced: true,
  state: () => ({
    isFetching: false,
    isAuthenticated: false,
  }),
  getters: {
    getIsFetching: (state) => state.isFetching,
    getAuthenticatedState: (state) => state.isAuthenticated,
  },
  actions: {
    /**
     * @function fetchUser
     *
     * @returns { promise }
     */
    async fetchUser({ dispatch }) {
      try {
        const user = await Auth.currentAuthenticatedUser();

        if (user) {
          dispatch("user/fetch", user.attributes.sub, { root: true });
        }
      } catch (err) {
        console.error("!", "@state:auth::fetchUser", err);
      }
    },

    /**
     * @async
     * @function updateUserAttributes
     */
    async updateAuthAttributes(_, attributes = {}) {
      const user = await Auth.currentAuthenticatedUser();

      console.log("User: ", user);

      try {
        const updatedAttributes = await Auth.updateUserAttributes(
          user,
          attributes
        );

        console.log("Updated attrs: ", updatedAttributes);
      } catch (err) {
        console.error("!", "@state:auth::updateAuthAttribues", err);
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
      { commit, dispatch },
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

        dispatch("user/create", dbUser, { root: true });
      } catch (err) {
        console.error("!", "@state:auth::signUp", err);

        commit("updateAuthState", false);
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
    async signIn({ commit, dispatch }, { userName, password } = {}) {
      try {
        commit("setIsFetching", true);

        const user = await Auth.signIn(userName, password);

        /* Find authenticated user in db & update state */
        if (user) {
          dispatch("user/fetch", user.attributes.sub, { root: true });

          commit("updateAuthState", true);
          commit("setIsFetching", false);
        }
      } catch (err) {
        console.error("!", "@state:auth::signIn", err);

        commit("updateAuthState", false);
      }
    },

    /**
     * @async
     * @function signOut
     *
     * @returns { promise }
     */
    async signOut({ commit }) {
      try {
        await Auth.signOut();

        commit("updateAuthState", false);
        commit("user/updateUser", null, { root: true });
      } catch (err) {
        console.error("!", "@state:auth::signOut", err);
      }
    },
  },
  mutations: {
    updateAuthState: (state, isAuthenticated) =>
      (state.isAuthenticated = isAuthenticated),
    setIsFetching: (state, isFetching) => (state.isFetching = isFetching),
  },
};
