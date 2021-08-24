import Recipe from "@/models/recipe";

const featuredStore = {
  state: {
    featured: new Recipe(),
  },
  mutations: {
    setFeaturedTitle: (state, newTitle) => (state.featured.title = newTitle),
  },
  getters: {
    getFeaturedTitle: (state) => state.featured.title,
  },
};

export default featuredStore;
