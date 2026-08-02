import { truncates } from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import authConfigs from "../configs/auth.config.js";
// import dotenv from "dotenv";

// dotenv.config();

// export const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRE,
//   });
// };

export const register = async (req, res) => {
  const { email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) return res.json({ message: "user already exist" });
  try {
    const user = await User.create({ email, password });
    res.status(201).json({
      _id: user.id,
      email: user.email,
      password: user.password,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Require email and password" });
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(404).json({ message: "User not found" });
    const passwordMatched = await user.matchPassword(password);
    if (!passwordMatched)
      return res.status(401).json({ message: "email or password not matched" });
    const token = authConfigs.encodeToken(user.email, user._id.toString());
    res.cookie("User_tokens_19", token);
    res.status(200).json({
      success: true,
      message: "Login Successfull",
      user: {
        id: user._id,
        email: user.email,
      },
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const logOut = async (req, res) => {
  try {
    res.clearCookie("User_tokens_19");
    res.status(200).json({
      success: true,
      message: "Logged out Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const userControllers = { register, login, logOut };

export default userControllers;
