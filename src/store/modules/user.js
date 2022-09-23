import { API, graphqlOperation } from "aws-amplify";
import { getUser } from "../../graphql/queries";
import { updateUser, createUser } from "../../graphql/mutations";

export default {
  namespaced: true,
  state: () => ({
    user: null,
  }),
  getters: {
    getUser: (state) => state.user,
    getUserFavorites: (state) => state.user.favorites.items,
  },
  mutations: {
    updateUser: (state, user) => (state.user = user),
    updateUserFavorites: (state, recipe) =>
      state.user.favorites.items.push(recipe),
  },
  actions: {
    async fetch({ commit }, id) {
      try {
        const { data } = await API.graphql(graphqlOperation(getUser, { id }));

        commit("updateUser", data.getUser);
      } catch (err) {
        console.error("!", "@state:user::fetch", err);
      }
    },
    async create(_, user) {
      try {
        const { data } = await API.graphql(
          graphqlOperation(createUser, { input: user })
        );

        console.log("Created User: ", data.createUser);
      } catch (err) {
        console.error("!", "@state:user::create", err);
      }
    },
    async update({ commit }, user) {
      try {
        const { data } = await API.graphql(
          graphqlOperation(updateUser, {
            input: user,
          })
        );

        commit("updateUser", data.updateUser);
      } catch (err) {
        console.error("!", "@state:user::update", err);
      }
    },
    async setFavorites({ commit, getters }, recipe) {
      const recipeAlreadyFavorited = await getters["getUserFavorites"].some(
        ({ id }) => recipe.id === id
      );
      if (!recipeAlreadyFavorited) {
        commit("updateUserFavorites", recipe);

        return {
          status: "added",
          message: `${recipe.title} added to favorites!`,
        };
      } else {
        return {
          status: "alreadyFavorited",
          message: "This recipe has already been favorited!",
        };
      }
    },
  },
};
