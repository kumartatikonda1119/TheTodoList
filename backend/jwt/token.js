import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/user.model.js";
dotenv.config();
export const generateTokenAndSaveInCookie = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
  await User.findByIdAndUpdate(userId, { token: token });
  return token;
};
