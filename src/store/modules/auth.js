import { Auth, API, graphqlOperation } from "aws-amplify";
import { createUser } from "@/graphql/mutations.js";
import { getUser } from "@/graphql/queries.js";

export default {
  namespaced: true,
  state: () => ({
    user: null,
    isFetching: false,
    isAuthenticated: false,
  }),
  getters: {
    getUser: (state) => state.user,
    getIsFetching: (state) => state.isFetching,
    getAuthenticatedState: (state) => state.isAuthenticated,
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
          const {
            data: { getUser: currentUser },
          } = await API.graphql(
            graphqlOperation(getUser, { id: user.attributes.sub })
          );

          console.log(currentUser);

          commit("updateUser", currentUser);
        }
      } catch (err) {
        console.error("!", "fetchUser:user.js", err);
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
      } catch (e) {
        console.error(e);

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
    async signIn({ commit }, { userName, password } = {}) {
      try {
        commit("setIsFetching", true);

        const user = await Auth.signIn(userName, password);

        /* Find authenticated user in db & update state */
        if (user) {
          const {
            data: { getUser: currentUser },
          } = await API.graphql(
            graphqlOperation(getUser, { id: user.attributes.sub })
          );

          console.log(currentUser);

          commit("updateUser", currentUser);
          commit("updateAuthState", true);
          commit("setIsFetching", false);
        }
      } catch (err) {
        console.error(err);

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
        commit("updateUser", null);
      } catch (err) {
        console.error(err);
      }
    },
  },
  mutations: {
    updateUser: (state, user) => (state.user = user),
    updateAuthState: (state, isAuthenticated) =>
      (state.isAuthenticated = isAuthenticated),
    setIsFetching: (state, isFetching) => (state.isFetching = isFetching),
  },
};
