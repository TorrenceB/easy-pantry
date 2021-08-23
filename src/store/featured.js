const featuredStore = {
  state: {
    title: "",
    servings: 0,
    summary: "",
    image: "",
  },
  mutations: {
    setFeaturedTitle: (state, newTitle) => (state.title = newTitle),
  },
  getters: {
    getFeaturedTitle: (state) => state.title,
  },
};

export default featuredStore;
