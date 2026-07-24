import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const encodeToken = (email, id) => {
  const payload = { email, id };
  const key = process.env.JWT_KEY;
  const expire = process.env.JWT_EXPIRE_IN;

  return jwt.sign(payload, key, { expiresIn: expire });
};

const decodeToken = () => {};

const authConfigs = { encodeToken, decodeToken };

export default authConfigs;
