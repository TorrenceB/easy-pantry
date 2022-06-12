export default function User({
  firstName = "",
  lastName = "",
  email = "",
  id = null,
  favorites = [],
}) {
  return {
    firstName,
    lastName,
    email,
    id,
    favorites,
  };
}
