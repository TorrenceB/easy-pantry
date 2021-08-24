export default class User {
  constructor(firstName = "", lastName = "", id = 0, favorites = []) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = id;
    this.favorites = favorites;
  }
}
