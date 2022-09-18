const Recipe = ({
  id = 0,
  title = "",
  image = "",
  instructions = "",
  summary = "",
  readyInMinutes = 0,
  healthScore = 0,
  servings = 0,
  aggregateLikes = 0,
  diets = [],
  sourceUrl = "",
}) => ({
  id,
  title,
  image,
  instructions,
  summary,
  readyInMinutes,
  healthScore,
  servings,
  aggregateLikes,
  diets,
  sourceUrl,
});

export default Recipe;
