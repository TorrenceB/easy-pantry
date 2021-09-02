const fetchRecipes = (url) => {
  // const recipeKey = process.env.VUE_APP_RECIPE_KEY;

  return fetch(url, {
    method: "GET",
    // headers: {
    //   "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    //   "x-rapidapi-key": recipeKey,
    // },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log(response.status);
      }
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => console.error(err));
};

export default fetchRecipes;
