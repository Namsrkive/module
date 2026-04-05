import express from "express";
import {
  getAdminAnalytics,
  getStudentAnalytics
} from "../controllers/analyticsController.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/admin", protect, getAdminAnalytics);
router.get("/student", protect, getStudentAnalytics);

export default router;