import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 30 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
});

const User = await mongoose.model("User", userSchema);

export default User;
