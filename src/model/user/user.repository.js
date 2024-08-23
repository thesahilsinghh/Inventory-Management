import mongoose from "mongoose";

import { userSchema } from "./user.schema.js";

const userModel = mongoose.model("user", userSchema);

export default class UserRepository {
  async add(user) {
    try {
      let newUser = new userModel(user);
      return await newUser.save();
    } catch (err) {
      return err.errorResponse.code;
    }
  }

  async isValid(password, email) {
    try {
      let user = await userModel.find({ email: email });
      if (user) {
        return user.password == password;
      }
    } catch (err) {
      console.log(err);
    }
  }
}
