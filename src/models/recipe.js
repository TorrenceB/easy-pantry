export default class Recipe {
  constructor(
    id = 0,
    recipeTitle = "",
    recipeSummary = "",
    recipeInstructions = "",
    ingredients = [],
    image = ""
  ) {
    this.id = id;
    this.recipeTitle = recipeTitle;
    this.recipeSummary = recipeSummary;
    this.recipeInstructions = recipeInstructions;
    this.ingredients = ingredients;
    this.image = image;
  }
}
