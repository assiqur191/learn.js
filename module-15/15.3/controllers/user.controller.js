import { addUser, getAllUsers } from "../services/user.services.js";

// geting all users from services
export const getUser = (req, res) => {
  const users = getAllUsers();
  res.status(200).json({
    success: true,
    data: users,
  });
};
export const createUser = (req, res) => {
  const newUser = addUser();
  res.status(201).json({
    success: true,
    data: newUser,
  });
};
