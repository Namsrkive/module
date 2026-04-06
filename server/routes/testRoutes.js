import express from "express";
import Test from "../models/Test.js";

const router = express.Router();

/* ================= CREATE TEST ================= */
router.post("/", async (req, res) => {
  try {
    const test = await Test.create(req.body);
    res.json(test);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= GET BY MODULE ================= */
router.get("/module/:moduleId", async (req, res) => {
  const tests = await Test.find({ module: req.params.moduleId });
  res.json(tests);
});

/* ================= GET BY TOPIC ================= */
router.get("/topic/:topicId", async (req, res) => {
  const tests = await Test.find({ topic: req.params.topicId });
  res.json(tests);
});

/* ================= GET BY COMPANY ================= */
router.get("/company/:companyId", async (req, res) => {
  const tests = await Test.find({ company: req.params.companyId });
  res.json(tests);
});

/* ================= GET BY ID (KEEP LAST) ================= */
router.get("/:id", async (req, res) => {
  const test = await Test.findById(req.params.id).populate("questions");
  res.json(test);
});

export default router;