export default class Recipe {
  constructor(
    id = 0,
    recipeTitle = "",
    recipeSummary = "",
    recipeInstructions = "",
    ingredients = [],
    image = "",
    numServings = 0
  ) {
    this.id = id ?? "";
    this.recipeTitle = recipeTitle ?? "";
    this.recipeSummary = recipeSummary ?? "";
    this.recipeInstructions = recipeInstructions ?? "";
    this.ingredients = ingredients ?? "";
    this.image = image ?? "Whoops this image seems to be missing!";
    this.numServings = numServings ?? "";
  }

  static fromJSON(json) {
    const recipeFromJson = new Recipe();
    recipeFromJson.id = json["id"];
    recipeFromJson.recipeTitle = json["title"];
    recipeFromJson.numServings = json["servings"];
    recipeFromJson.image = json["image"];
    recipeFromJson.recipeSummary = json["summary"];

    return recipeFromJson;
  }
}
