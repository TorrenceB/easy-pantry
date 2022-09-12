import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type RecipeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class User {
  readonly id: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly email?: string | null;
  readonly userName?: string | null;
  readonly favorites?: (Recipe | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class Recipe {
  readonly id: string;
  readonly recipeID: string;
  readonly title?: string | null;
  readonly image?: string | null;
  readonly instructions?: string | null;
  readonly summary?: string | null;
  readonly diets?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Recipe, RecipeMetaData>);
  static copyOf(source: Recipe, mutator: (draft: MutableModel<Recipe, RecipeMetaData>) => MutableModel<Recipe, RecipeMetaData> | void): Recipe;
}