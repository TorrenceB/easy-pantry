const fetchRecipes = (url, params) => {
  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const setURL = (url) => {
    const recipeKey = process.env.VUE_APP_RECIPE_KEY;    
    url = url += `?apiKey=${recipeKey}`;

    if (params) {
      url += `&${JSON.stringify(params)}`;
    }

    return url;
  };

  return fetch(setURL(url), options)
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
