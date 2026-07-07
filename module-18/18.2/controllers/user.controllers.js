import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";
import dotenv from "dotenv";

dotenv.config();

const genrateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
};

//register
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  // console.log("data grab from user");

  try {
    const userExist = await User.findOne({ email });
    if (userExist) return res.json({ message: "user Alredy Exist" });

    const user = await User.create({ name, email, password });
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      token: genrateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//login
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("password");
  if (!user) return res.status(401).json({ message: "User not found" });
  try {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: genrateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get profile
export const getProfile = async (req, res) => {
  req.json(req.user);
};

//forget password

export const forgetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.json({ message: "User not found" });

    const resetToken = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    const resultUri = `${process.env.CLIENT_URI}/reset-password/${resetToken}`;
    const message = `Reset your password : \n\n${resetToken} `;
    await sendEmail({
      email: user.email,
      subject: "Password Reset tokken send",
      message,
    });

    res.json({ message: "Email send from forget pass" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  resetpass with token
export const resetPassword = async (req, res) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");
  try {
    const user = await User.findOne({
      resetPasswordToken: resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) return res.json({ message: "User not found" });

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    res.status(200).json({
      message: "password reset",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
