/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      firstName
      lastName
      email
      userName
      favorites {
        items {
          id
          userID
          title
          image
          instructions
          summary
          diets
          readyInMinutes
          healthScore
          servings
          aggregateLikes
          sourceUrl
          createdAt
          updatedAt
        }
        nextToken
      }
      featuredRecipe {
        id
        userID
        title
        image
        instructions
        summary
        diets
        readyInMinutes
        healthScore
        servings
        aggregateLikes
        sourceUrl
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        email
        userName
        favorites {
          nextToken
        }
        featuredRecipe {
          id
          userID
          title
          image
          instructions
          summary
          diets
          readyInMinutes
          healthScore
          servings
          aggregateLikes
          sourceUrl
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRecipe = /* GraphQL */ `
  query GetRecipe($id: ID!) {
    getRecipe(id: $id) {
      id
      userID
      title
      image
      instructions
      summary
      diets
      readyInMinutes
      healthScore
      servings
      aggregateLikes
      sourceUrl
      createdAt
      updatedAt
    }
  }
`;
export const listRecipes = /* GraphQL */ `
  query ListRecipes(
    $filter: ModelRecipeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecipes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        title
        image
        instructions
        summary
        diets
        readyInMinutes
        healthScore
        servings
        aggregateLikes
        sourceUrl
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
