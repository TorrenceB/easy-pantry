const Recipe = (state) => ({
  id: state.id,
  title: state.title,
  image: state.image,
  instructions: state.instructions,
  summary: state.summary,
  diets: state.tags,
});

export default Recipe;
