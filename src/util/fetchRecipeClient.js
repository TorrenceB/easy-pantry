const fetchRecipes = (url, params = {}) => {
  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const setURL = (url, params) => {
    const recipeKey = process.env.VUE_APP_RECIPE_KEY;

    url += `?apiKey=${recipeKey}`;

    if (params) {
      const paramString = Object.entries(params)
        .map(([key, value]) => {
          return `&${key}=${value}`;
        })
        .join("");

      url += paramString;
    }

    return url;
  };

  return fetch(setURL(url, params), options)
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
