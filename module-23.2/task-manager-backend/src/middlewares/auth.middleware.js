import authConfigs from "../configs/auth.config.js";

export const validation = async (req, res, next) => {
  const token = req.cookies["User_tokens_23.2"];
  if (!token) return res.status(401).json({ message: "there is no token" });

  try {
    const decoded = authConfigs.decodeToken(token);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded;
    req.headers.email = decoded.email;
    req.headers._id = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
