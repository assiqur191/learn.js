import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import authConfig from "../configs.js/auth.config.js";

//register
export const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, NIDNumber, phoneNumber, bloodGroup, password } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !NIDNumber ||
    !phoneNumber ||
    !bloodGroup ||
    !password
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  const userExist = await User.findOne({ NIDNumber });
  if (userExist) return res.status(409).json({ message: "user already exist" });

  const user = await User.create({
    firstName,
    lastName,
    NIDNumber,
    phoneNumber,
    bloodGroup,
    password,
  });

  res.status(201).json({
    success: true,
    message: "User create succfully",
    data: {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      NIDNumber: user.NIDNumber,
      phoneNumber: user.phoneNumber,
      bloodGroup: user.bloodGroup,
    },
  });
});

//login
export const login = asyncHandler(async (req, res) => {
  const { phoneNumber, password } = req.body;
  if (!phoneNumber || !password)
    return res
      .status(400)
      .json({ message: "Require PhoneNumber and password" });
  const user = await User.findOne({ phoneNumber }).select("+password");
  if (!user) return res.status(404).json({ message: "User not found" });
  const passwordMatched = await user.matchPassword(password);
  if (!passwordMatched)
    return res.status(401).json({ message: "email or password not matched" });
  const token = authConfig.encodedToken(user.NIDNumber, user._id);
  res.cookie("M20_token", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    success: true,
    message: "Login Successfull",
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      NIDNumber: user.NIDNumber,
      phoneNumber: user.phoneNumber,
      bloodGroup: user.bloodGroup,
    },
  });
});

//logout

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("M20_token");
  res.status(200).json({
    success: true,
    message: "Logged out Successfully",
  });
});

//alluser

export const allUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (users.length === 0)
    return res.status(404).json({ message: "There is no Users" });
  res.status(200).json({
    success: true,
    data: users,
  });
});

//single user

export const singleUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json({
    success: true,
    data: user,
  });
});

//update
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    NIDNumber: req.headers.NIDNumber,
  });
  if (!user) return res.status(404).json({ message: "User not found" });
  const { firstName, lastName, NIDNumber, phoneNumber, bloodGroup } = req.body;
  user.firstName = firstName ?? user.firstName;
  user.lastName = lastName ?? user.lastName;
  user.NIDNumber = NIDNumber ?? user.NIDNumber;
  user.phoneNumber = phoneNumber ?? user.phoneNumber;
  user.bloodGroup = bloodGroup ?? user.bloodGroup;

  await user.save();
  res.status(200).json({
    success: true,
    data: user,
  });
});

//delete
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    NIDNumber: req.headers.NIDNumber,
  });
  if (!user) return res.status(404).json({ message: "User not found" });

  await user.deleteOne();
  res.status(200).json({
    success: true,
    message: "user Delete successfully",
  });
});

const userController = {
  register,
  allUsers,
  singleUser,
  login,
  logout,
  updateUser,
  deleteUser,
};

export default userController;
