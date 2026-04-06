import express from "express";
import { seedCompanyTest } from "../controllers/seedController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/company", protect, seedCompanyTest);

export default router;