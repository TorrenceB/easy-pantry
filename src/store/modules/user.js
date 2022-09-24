import { API, graphqlOperation } from "aws-amplify";
import { getUser } from "../../graphql/queries";
import {
  updateUser,
  createUser,
  updateRecipe,
  // createRecipe,
} from "../../graphql/mutations";
import Recipe from "@/models/recipe.js";

export default {
  namespaced: true,
  state: () => ({
    user: null,
  }),
  getters: {
    getUser: (state) => state.user,
    getUserFavorites: (state) => state.user?.favorites.items,
  },
  mutations: {
    updateUser: (state, user) => (state.user = user),
    addToFavorites: (state, recipe) => state.user.favorites.items.push(recipe),
    removeFromFavorites: (state, id) => {
      const filtered = state.user.favorites.items.filter(
        (recipe) => recipe.id !== id
      );

      return (state.user.favorites.items = filtered);
    },
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
    async createFavorite({ commit, rootGetters }, recipe) {
      const { id: userID } = rootGetters["user/getUser"];
      const newRecipe = Recipe(recipe);
      const input = Object.assign(newRecipe, { userID }, {});

      try {
        const { data } = await API.graphql(
          graphqlOperation(updateRecipe, { input })
        );

        commit("addToFavorites", data.updateRecipe);

        return {
          status: "created",
          message: `${recipe.title} added to favorites!`,
        };
      } catch (err) {
        console.error(err);

        return {
          status: "error",
          message: `Oops, there was an error adding this recipe!`,
        };
      }
    },
    async deleteFavorite({ commit }, { id }) {
      const input = {
        id,
        userID: null,
      };

      try {
        const { data } = await API.graphql(
          graphqlOperation(updateRecipe, { input })
        );

        commit("removeFromFavorites", data.updateRecipe.id);

        return {
          status: "deleted",
          message: "This recipe has been removed from favorites!",
        };
      } catch (err) {
        console.error("!", "@state:user::deleteFavorite", err);

        return {
          status: "error",
          message: `Oops, there was an error adding this recipe!`,
        };
      }
    },
  },
};
