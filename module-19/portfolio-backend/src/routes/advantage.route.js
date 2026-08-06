import express from "express";
import { validation } from "../middlewares/auth.middlewares.js";
import advantageController from "../controllers/advantage.controller.js";

const router = express.Router();

router.post("/create", validation, advantageController.createAdvantage);

router.get("/all", advantageController.getAllAdvantages);

router.get("/my", validation, advantageController.getMyAdvantages);

router.get("/single/:id", advantageController.getSingleAdvantage);

router.put("/update/:id", validation, advantageController.updateAdvantage);

router.delete("/delete/:id", validation, advantageController.deleteAdvantage);

export default router;
