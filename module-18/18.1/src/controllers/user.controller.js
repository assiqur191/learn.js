const { default: mongoose } = require("mongoose");
const User = require("../models/user.model");

const createUser = async (req, res) => {
  const data = req.body;
  const result = await User.create(data);
  res.json({
    massage: " User Created Successfully",
    data: result,
  });
};
const userController = {
  createUser,
};
module.exports = userController;
