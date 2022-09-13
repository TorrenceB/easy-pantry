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
          title
          image
          instructions
          summary
          diets
          readyInMinutes
          healthScore
          servings
          aggregateLikes
          createdAt
          updatedAt
        }
        nextToken
      }
      featuredRecipe {
        id
        title
        image
        instructions
        summary
        diets
        readyInMinutes
        healthScore
        servings
        aggregateLikes
        user {
          id
          firstName
          lastName
          email
          userName
          createdAt
          updatedAt
        }
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
          title
          image
          instructions
          summary
          diets
          readyInMinutes
          healthScore
          servings
          aggregateLikes
          createdAt
          updatedAt
        }
        nextToken
      }
      featuredRecipe {
        id
        title
        image
        instructions
        summary
        diets
        readyInMinutes
        healthScore
        servings
        aggregateLikes
        user {
          id
          firstName
          lastName
          email
          userName
          createdAt
          updatedAt
        }
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
          title
          image
          instructions
          summary
          diets
          readyInMinutes
          healthScore
          servings
          aggregateLikes
          createdAt
          updatedAt
        }
        nextToken
      }
      featuredRecipe {
        id
        title
        image
        instructions
        summary
        diets
        readyInMinutes
        healthScore
        servings
        aggregateLikes
        user {
          id
          firstName
          lastName
          email
          userName
          createdAt
          updatedAt
        }
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
      title
      image
      instructions
      summary
      diets
      readyInMinutes
      healthScore
      servings
      aggregateLikes
      user {
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
          title
          image
          instructions
          summary
          diets
          readyInMinutes
          healthScore
          servings
          aggregateLikes
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
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
      title
      image
      instructions
      summary
      diets
      readyInMinutes
      healthScore
      servings
      aggregateLikes
      user {
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
          title
          image
          instructions
          summary
          diets
          readyInMinutes
          healthScore
          servings
          aggregateLikes
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
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
      title
      image
      instructions
      summary
      diets
      readyInMinutes
      healthScore
      servings
      aggregateLikes
      user {
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
          title
          image
          instructions
          summary
          diets
          readyInMinutes
          healthScore
          servings
          aggregateLikes
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
