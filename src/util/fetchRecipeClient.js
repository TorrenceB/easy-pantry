const fetchRecipes = (url, params = {}) => {
  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  };

  /* 
    const params = {
      cuisine: "mexican",
      foo: "bar",
    }
    const baseURL = "baseURL.com";

    ["cuisine=mexican", "foo=bar"].map(param => {
      return `&${param}`  
    }) //["&cuisine=mexican", "&foo=bar"];

    1. Params object to array
    2. Adding & to beginning of each param
    3. convert array values to string

  */

  const setURL = (url) => {
    const recipeKey = process.env.VUE_APP_RECIPE_KEY;

    url += `?apiKey=${recipeKey}`;

    if (params) {
      const paramsToArr = [];

      Object.keys(params).forEach((key) => {
        paramsToArr.push(`&${key}=${params[key]}`);
      });

      url += paramsToArr.join("");
    }

    console.log(url);
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
