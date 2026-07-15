import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
// import { bcrypt } from 'bcryptjs';

const userSchema = new Schema({
  email: {
    type: String,
    requried: [true, "Email is requried"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    requried: [true, "password is requried"],
    minlength: [6, "Password must be at least 6 charecters"],
    select: false,
  },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = model("user", userSchema);

export default User;
