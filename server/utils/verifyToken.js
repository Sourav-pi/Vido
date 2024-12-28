import jwt from "jsonwebtoken";
import { createError } from "./error.js";
import Blacklist from "../models/BlacklistModel.js";

export const verifyToken = async (req, res, next) => {
  console.log(req);
  const token = req.cookies.access_token;

  if (!token) {
    return next(createError(401, "Unauthorized"));
  }

  try {
    const isBlacklisted = await Blacklist.findOne({ token });
    console.log(isBlacklisted);
    if (isBlacklisted) {
      return next(createError(401, "Token is expired."));
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (e) {
    return next(createError(401, "Invalid token"));
  }
};
