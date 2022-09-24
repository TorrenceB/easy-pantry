/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createRecipe = /* GraphQL */ `
  mutation CreateRecipe(
    $input: CreateRecipeInput!
    $condition: ModelRecipeConditionInput
  ) {
    createRecipe(input: $input, condition: $condition) {
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
export const updateRecipe = /* GraphQL */ `
  mutation UpdateRecipe(
    $input: UpdateRecipeInput!
    $condition: ModelRecipeConditionInput
  ) {
    updateRecipe(input: $input, condition: $condition) {
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
export const deleteRecipe = /* GraphQL */ `
  mutation DeleteRecipe(
    $input: DeleteRecipeInput!
    $condition: ModelRecipeConditionInput
  ) {
    deleteRecipe(input: $input, condition: $condition) {
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
