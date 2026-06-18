import { Router } from "express";
import { createUser } from "../controllers/user.controller.js";
// import app from "../app";

const router = Router();

//all CRUD request:-
// router.get("/allUsers", controller);
router.post("/createuser", createUser);

export default router;
