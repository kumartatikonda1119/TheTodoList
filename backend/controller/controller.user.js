import User from "../model/user.model.js";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { generateTokenAndSaveInCookie } from "../jwt/token.js";
const userSchema = z.object({
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "invalid email" }),

  username: z
    .string()
    .min(3, { message: "user name should be atleast 3 characters" }),
  password: z
    .string()
    .min(6, { message: "password should be atleast 6 chars" }),
});
export const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const validation = userSchema.safeParse({ email, username, password });

    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => issue.message);
      return res.status(400).json({ message: errors });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "user already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();
    if (newUser) {
      const token = await generateTokenAndSaveInCookie(newUser._id, res);
      return res
        .status(201)
        .json({ message: "user registered successfully", newUser, token });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error in registration of user" });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("login here ", email, password);
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const user = await User.findOne({ email }).select("+password");
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!user || !isPasswordMatched) {
      return res.status(400).json({ message: "invalid email or password" });
    }
    const token = await generateTokenAndSaveInCookie(user._id, res);
    return res
      .status(200)
      .json({ message: "user logged in successfully", user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error in user login" });
  }
};
export const logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      path: "/",
    });
    return res.status(200).json({ message: "user logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error in user logout" });
  }
};
