import express from "express";
import { saveResult, getLatestResult } from "../controllers/resultController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, saveResult);
router.get("/latest", protect, getLatestResult);

export default router;