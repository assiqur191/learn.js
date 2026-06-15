/* 
This user.routes.js
  -only define routes
  - No logic
  -no Controller call
*/

import { Router } from "express";
import { createUser, getUser } from "../controllers/user.controller.js";

const router = Router();

router.get("/", getUser);
router.post("/", createUser);

//export the file
export default router;
