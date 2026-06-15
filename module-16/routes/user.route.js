import { Router } from "express";
import {
  addAdmin,
  blockUser,
  changePassword,
  createUser,
  deleteAccount,
  deleteUser,
  getUser,
  getUserById,
  loginUser,
  logoutUser,
  removeAdmin,
  search,
  unblockUser,
  updateUser,
  uploadPicture,
  userFilter,
  verification,
  verifyEmail,
} from "../controllers/user.controller.js";

const router = Router();

//// create all the route path and connection with controller

router.post("/create-user", createUser);
router.get("/read-user", getUser);
router.put("/update-user", updateUser);
router.delete("/delete-user", deleteUser);
router.get("/all-users", getUser);
router.get("/user/:id", getUserById);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/change-password", changePassword);
router.put("/update-profile", updateUser);
router.put("/make-admin/:id", addAdmin);
router.put("/remove-admin/:id", removeAdmin);
router.get("/search", search);
router.get("/filter", userFilter);
router.patch("/block-user/:id", blockUser);
router.patch("/unblock-user/:id", unblockUser);
router.post("/verify-email", verifyEmail);
router.post("/resend-verification", verification);
router.post("/upload-profile-picture", uploadPicture);
router.delete("/delete-account", deleteAccount);

export default router;
