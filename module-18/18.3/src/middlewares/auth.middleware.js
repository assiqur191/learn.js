import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// import bcrypt from "bcryptjs";

dotenv.config();

export const auth = (req, res, next) => {
  const token = req.cookies["user_token"];
  if (!token) return res.status(401).json({ message: "Forbiden User" });
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decode._id;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const authmiddleware = { auth };
export default authmiddleware;
