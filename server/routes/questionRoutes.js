import express from "express";
import Question from "../models/Question.js";

const router = express.Router();

/* ================= CREATE QUESTION ================= */
router.post("/", async (req, res) => {
try {
console.log("Incoming Data:", req.body);

```
const { module, topic, question, options, answer } = req.body;

if (!module || !topic || !question || !answer) {
  return res.status(400).json({ error: "Missing required fields" });
}

if (!options || options.length < 4) {
  return res.status(400).json({ error: "At least 4 options required" });
}

if (!options.includes(answer)) {
  return res.status(400).json({ error: "Answer must match one option" });
}

const newQuestion = await Question.create(req.body);

res.json(newQuestion);
```

} catch (err) {
console.error("Error adding question:", err);
res.status(500).json({ error: err.message });
}
});


/* ================= GET ALL QUESTIONS ================= */
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= DELETE QUESTION ================= */
router.delete("/:id", async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: "Question deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;