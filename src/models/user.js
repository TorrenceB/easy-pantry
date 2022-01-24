export default class User {
  constructor(
    firstName = "",
    lastName = "",
    email = "",
    id = 0,
    favorites = []
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.id = id;
    this.favorites = favorites;
  }
}
