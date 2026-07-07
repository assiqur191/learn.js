import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Add a name kindly"],
  },
  email: {
    type: String,
    required: [true, "Add a email kindly"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Add Password"],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// Encrypt- the the pass
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

//Match the user enter password to the hashed/encryped password in Database

userSchema.methods.matchPassword = async function (enterdPassword) {
  return await bcrypt.compare(enterdPassword, this.password);
};

export default mongoose.model("User", userSchema);
