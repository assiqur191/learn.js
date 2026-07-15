import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
// import { bcrypt } from "bcryptjs";

export const gettoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });

    if (userExist)
      return res.status(401).json({ message: "User Alredy exist" });

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashPassword });

    res.status(201).json({
      success: true,
      name: user.name,
      email: user.email,
      password: user.password,
      token: gettoken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: "password didnt match" });
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE_IN,
      },
    );
    // console.log(token);f
    res.status(200).cookie("user_token", token).json({
      success: true,
      name: user.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const authController = { register, login };

export default authController;
