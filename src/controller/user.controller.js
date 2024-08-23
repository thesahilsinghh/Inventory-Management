import UserRepository from "../model/user/user.repository.js";

export default class UserController {
  userRepo = new UserRepository();

  //get requests
  getRegister(req, res) {
    res.render("register-page", { error: null });
  }

  getLogin(req, res) {
    res.render("login-page", { error: null });
  }

  // post requests
  async addUser(req, res) {
    try {
      let { name, email, password } = req.body;
      let isDone = await this.userRepo.add({ name, email, password });
      if (isDone == 11000) {
        res.render("register-page", {
          error: "User Exists! please try login",
        });
      } else if (isDone) {
        res.render("login-page", { error: null });
      } else {
        res.render("register-page", {
          error: "please provide valid credentials!",
        });
      }
    } catch (err) {
      console.log(err);
      next();
    }
  }

  async login(req, res, next) {
    try {
      const { password, email } = req.body;
      let isFound = await this.userRepo.isValid(password, email);

      if (isFound) {
        req.session.userEmail = email;
        return res.redirect("/");
      } else {
        res.render("login-page", { error: "Invalid Credentials" });
      }
    } catch (err) {
      console.log(err);
      next();
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
