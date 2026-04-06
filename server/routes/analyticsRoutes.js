import express from "express";
import {
  getAdminAnalytics,
  getStudentAnalytics,
  getLeaderboard,
} from "../controllers/analyticsController.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();

/* ADMIN */
router.get("/admin", protect, getAdminAnalytics);

/* STUDENT */
router.get("/student", protect, getStudentAnalytics);

/* LEADERBOARD */
router.get("/leaderboard", protect, getLeaderboard);

export default router;