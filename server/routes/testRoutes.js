import express from "express";
import Test from "../models/Test.js";

const router = express.Router();

/* GET ALL TESTS */
router.get("/", async (req, res) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

/* GET SINGLE TEST */
router.get("/:id", async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);

    if (!test) {
      return res.status(404).json({ msg: "Test not found" });
    }

    res.json(test);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;