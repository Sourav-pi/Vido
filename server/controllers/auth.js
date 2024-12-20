import mongoose from "mongoose";
import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";
import env from "dotenv";

const SALT_ROUNDS = 10;

async function signup(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = new User({
      name: name,
      email: email,
      password: hash,
    });
    await newUser.save();
    console.log("User created");
    res.status(200).json(newUser);
  } catch (e) {
    next(e);
  }
}
async function signin(req, res, next) {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
      return next(createError(401, "Invalid credentials"));
    }

    const { password: hashed_password, ...others } = user._doc;
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(others);
  } catch (e) {
    next(e);
  }
}

export { signup, signin };
