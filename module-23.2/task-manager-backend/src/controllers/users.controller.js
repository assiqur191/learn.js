import User from "../models/users.model.js";

import authConfigs from "../configs/auth.config.js";
import asyncHandler from "express-async-handler";

//---- Register
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res
      .status(400)
      .json({ message: "Require name, email and password" });
  if (name.length < 3 || name.length > 30) {
    return res
      .status(400)
      .json({ message: "Name must be between 3 and 30 characters" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }
  const userExist = await User.findOne({ email });
  if (userExist) return res.status(400).json({ message: "user already exist" });
  const user = await User.create({ name, email, password });
  const token = authConfigs.encodeToken(user.email, user._id);
  res.cookie("User_tokens_23.2", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(201).json({
    message: "user created successfully",
    user: { id: user._id, name: user.name, email: user.email },
    token,
  });
});
//----Login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Require email and password" });
  const user = await User.findOne({ email }).select("+password");
  if (!user) return res.status(404).json({ message: "User not found" });
  const passwordMatched = await user.comparePassword(password);
  if (!passwordMatched)
    return res.status(401).json({ message: "email or password not matched" });
  const token = authConfigs.encodeToken(user.email, user._id.toString());
  res.cookie("User_tokens_23.2", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  }); // Set cookie for 1 day
  res.status(200).json({
    success: true,
    message: "Login Successfull",
    user: { id: user._id, name: user.name, email: user.email },
    token,
  });
});

export const logOut = asyncHandler(async (req, res) => {
  res.clearCookie("User_tokens_23.2");
  res.status(200).json({ success: true, message: "Logged out Successfully" });
});

//-get me

export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.clearCookie("User_tokens_23.2");
    return res.status(401).json({
      success: false,
      message: "User not found. Please log in again.",
    });
  }

  return res.status(200).json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

const userControllers = { register, login, logOut, getMe };

export default userControllers;
