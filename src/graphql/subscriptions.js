/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateRecipe = /* GraphQL */ `
  subscription OnCreateRecipe {
    onCreateRecipe {
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
export const onUpdateRecipe = /* GraphQL */ `
  subscription OnUpdateRecipe {
    onUpdateRecipe {
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
export const onDeleteRecipe = /* GraphQL */ `
  subscription OnDeleteRecipe {
    onDeleteRecipe {
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
