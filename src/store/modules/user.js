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
    async createFavorite({ commit, rootGetters, dispatch }, recipe) {
      const input = {
        id: recipe.id,
        userID: rootGetters["user/getUser"].id,
      };

      try {
        const getRecipe = await dispatch("recipe/get", recipe.id, {
          root: true,
        });
        /* Check if recipe exists in DB */
        if (getRecipe) {
          /* If it does, update */
          const updatedRecipe = await dispatch("recipe/update", input, {
            root: true,
          });

          commit("addToFavorites", updatedRecipe);
        } else {
          /* If not, create a new one */
          const createdRecipe = await dispatch("recipe/create", recipe, {
            root: true,
          });

          commit("addToFavorites", createdRecipe);
        }

        return {
          status: "created",
          message: `${recipe.title} added to favorites!`,
        };
      } catch (err) {
        console.error("!", "@state:user::createFavorite", err);

        return {
          status: "error",
          message: `Oops, there was an error adding this recipe!`,
        };
      }
    },
    async deleteFavorite({ commit, dispatch }, { id }) {
      const recipe = {
        id,
        userID: null,
      };

      try {
        const updatedRecipe = await dispatch("recipe/update", recipe, {
          root: true,
        });

        commit("removeFromFavorites", updatedRecipe.id);

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
