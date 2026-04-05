import express from "express";
import { saveResult, getResults } from "../controllers/resultController.js";

const router = express.Router();

router.post("/save", saveResult);
router.get("/:userId", getResults);

export default router;