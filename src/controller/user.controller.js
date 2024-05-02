import UserModel from "../model/user.model.js";
import ProductModel from "../model/product.model.js";
export default class UserController {
  getRegister(req, res) {
    res.render("register-page", { error: null });
  }

  addUser(req, res) {
    UserModel.add(req.body);
    res.render("login-page", { error: null });
  }

  getLogin(req, res) {
    res.render("login-page", { error: null });
  }

  login(req, res) {
    const { password, email } = req.body;
    let isFound = UserModel.isValid(password, email);

    if (isFound) {
      req.session.userEmail = email;
      return res.redirect("/");
    } else {
      res.render("login-page", { error: "Invalid Credentials" });
    }
  }

  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.clearCookie("lastVisit");
        res.redirect("/login");
      }
    });
  }
}
