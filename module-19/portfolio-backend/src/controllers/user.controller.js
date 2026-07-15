import User from "../models/user.model.js";

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

const userControllers = { register };

export default userControllers;
