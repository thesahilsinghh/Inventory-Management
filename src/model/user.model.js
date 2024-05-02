export default class UserModel {
  constructor(_id, _name, _email, _password) {
    this.id = _id;
    this.name = _name;
    this.email = _email;
    this.password = _password;
  }

  static add(user) {
    let newUser = new UserModel(
      users.length + 1,
      user.name,
      user.email,
      user.password
    );
    users.push(newUser);
    return true;
  }

  static isValid(password,email) {
    let isFound = false;
    users.forEach((curr) => {
      if (curr.email == email && curr.password == password)
        return (isFound = true);
    });
    return isFound;
  }
}
let users = [];
