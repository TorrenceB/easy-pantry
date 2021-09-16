const fetchRecipes = (url, params) => {
  const recipeKey = process.env.VUE_APP_RECIPE_KEY;

  return fetch(`${url}?apiKey=${recipeKey}&${params ?? ""}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log(response.status);
      }
    })
    .then((data) => {
      return data;
    })
    .catch((err) => console.error(err));
};

export default fetchRecipes;
