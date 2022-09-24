const Recipe = ({
  id = null,
  userID = null,
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
  userID,
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
