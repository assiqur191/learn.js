import authConfigs from "../configs/auth.config.js";

export const validation = async (req, res, next) => {
  // import jwt from 'jsonwebtoken';
  //   (!token) return res.status(404).json({ message: "U r not Authorized" });
  const token = req.cookies["User_tokens_19"];
  if (!token) return res.status(401).json({ message: "there is no token" });

  try {
    const decodedToken = authConfigs.decodeToken(token);
    if (decodedToken == null) {
      return res.status(401).json({
        message: "u are not validate user",
      });
    }

    req.headers.email = decodedToken["email"];
    req.headers._id = decodedToken["id"];
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
