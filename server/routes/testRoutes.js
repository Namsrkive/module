import express from "express";
import Test from "../models/Test.js";
import Question from "../models/Question.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

/* ================= CREATE TEST (ADMIN) ================= */
router.post("/", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const {
      name,
      duration,
      type,
      difficulty,
      module,
      topic,
      company
    } = req.body;

    if (!name || !duration || !type) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const test = await Test.create({
      name,
      duration,
      type,
      difficulty,
      module: type === "module" ? module : null,
      topic: type === "module" ? topic : null,
      company: type === "company" ? company : null,
      questions: [],
      isPublished: false
    });

    res.json(test);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= GET ALL TESTS ================= */
router.get("/", protect, async (req, res) => {
  try {
    const tests = await Test.find();

    // 👉 if student → show only published
    if (req.user.role === "student") {
      return res.json(tests.filter(t => t.isPublished));
    }

    res.json(tests);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= GET BY MODULE ================= */
router.get("/module/:module", protect, async (req, res) => {
  const tests = await Test.find({ module: req.params.module });
  res.json(tests);
});

/* ================= GET BY COMPANY ================= */
router.get("/company/:company", protect, async (req, res) => {
  const tests = await Test.find({ company: req.params.company });
  res.json(tests);
});

/* ================= DELETE TEST (ADMIN) ================= */
router.delete("/:id", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    await Test.findByIdAndDelete(req.params.id);
    res.json({ message: "Test deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= TOGGLE PUBLISH ================= */
router.put("/:id/publish", protect, async (req, res) => {
  try {
    console.log("Publish route hit"); // ✅ ADD

    if (req.user.role !== "admin") {
      console.log("Not admin:", req.user); // ✅ ADD
      return res.status(403).json({ msg: "Access denied" });
    }

    const test = await Test.findById(req.params.id);

    console.log("Before:", test.isPublished); // ✅ ADD

    test.isPublished = !test.isPublished;
    await test.save();

    console.log("After:", test.isPublished); // ✅ ADD

    res.json(test);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/* ================= GENERATE TEST ================= */
router.post("/generate", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const { testId, sections } = req.body;

    let questions = [];

    for (let sec of sections) {
      const found = await Question.find({
        module: sec.module,
        topic: sec.topic,
        difficulty: sec.difficulty,
        ...(sec.company && { company: sec.company })
      }).limit(sec.count);

      questions.push(...found.map(q => q._id));
    }

    await Test.findByIdAndUpdate(testId, { questions });

    res.json({ message: "Test generated successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Generation failed" });
  }
});

/* ================= GET BY ID ================= */
router.get("/:id", protect, async (req, res) => {
  try {
    const test = await Test.findById(req.params.id).populate("questions");
    res.json(test);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
/* ================= GET BY MODULE + TOPIC ================= */
router.get("/filter", protect, async (req, res) => {
  try {
    const { module, topic } = req.query;

    const tests = await Test.find({
      module,
      topic,
      isPublished: true // 👈 important (students only see live tests)
    });

    res.json(tests);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;