import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const encodedToken = (NIDNumber, id) => {
  try {
    const payload = { NIDNumber, id };
    const key = process.env.JWT_KEY;
    const expire = process.env.JWT_EXPIRE_IN;

    return jwt.sign(payload, key, { expiresIn: expire });
  } catch (error) {
    return null;
  }
};

const decodeToken = (token) => {
  try {
    const key = process.env.JWT_KEY;
    const decode = jwt.verify(token, key);
    return decode;
  } catch (error) {
    return null;
  }
};

const authConfig = { encodedToken, decodeToken };

export default authConfig;
