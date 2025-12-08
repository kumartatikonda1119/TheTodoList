import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
export const authenticate = async (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(req.cookies);
  
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);
  } catch (error) {
    return res.status(401).json({ message: "" + error.message });
  }
  next();
};
