import express from "express";
import Module from "../models/Module.js";

const router = express.Router();

// CREATE MODULE
router.post("/", async (req, res) => {
  try {
    const module = await Module.create(req.body);
    res.json(module);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET MODULES
router.get("/", async (req, res) => {
  const modules = await Module.find();
  res.json(modules);
});

export default router;