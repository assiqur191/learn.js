import asyncHandler from "express-async-handler";
import authConfig from "../configs.js/auth.config.js";

export const validation = asyncHandler(async (req, res, next) => {
  const token = req.cookies["M20_token"];
  if (!token) return res.status(401).json({ message: "there is no token" });
  const decodeToken = authConfig.decodeToken(token);

  req.headers._id = decodeToken["id"];
  req.headers.NIDNumber = decodeToken["NIDNumber"];
  next();
});
