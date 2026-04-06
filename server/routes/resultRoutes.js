import express from "express";
import {
  saveResult,
  getLatestResult,
  getAllResults   // ✅ ADD
} from "../controllers/resultController.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, saveResult);
router.get("/latest", protect, getLatestResult);

/* 🔥 NEW ROUTE */
router.get("/", protect, getAllResults);

export default router;