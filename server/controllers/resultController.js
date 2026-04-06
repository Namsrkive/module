import Result from "../models/Result.js";
import Test from "../models/Test.js";

/* ================= SAVE RESULT ================= */
export const saveResult = async (req, res) => {
  try {
    const { testId, score, total, answers } = req.body;

    // ✅ VALIDATION
    if (!testId || score === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // ✅ GET TEST DETAILS (IMPORTANT FIX)
    const test = await Test.findById(testId);

    if (!test) {
      return res.status(404).json({ error: "Test not found" });
    }

    // ✅ SAFE ANSWERS
    const safeAnswers = Array.isArray(answers) ? answers : [];

    // ✅ CREATE RESULT
    const result = await Result.create({
      user: req.user.id,
      testId,
      testName: test.name,     // 🔥 ADD
      module: test.module,     // 🔥 ADD (important for analytics)
      score,
      total: total || test.questions.length, // fallback safe
      answers: safeAnswers
    });

    res.json({
      msg: "Result saved successfully",
      result
    });

  } catch (err) {
    console.error("Save Result Error:", err);
    res.status(500).json({ error: err.message });
  }
};


/* ================= GET LATEST RESULT ================= */
export const getLatestResult = async (req, res) => {
  try {
    const result = await Result.findOne({ user: req.user.id })
      .sort({ createdAt: -1 });

    if (!result) {
      return res.json({ msg: "No results found" });
    }

    res.json(result);

  } catch (err) {
    console.error("Get Latest Result Error:", err);
    res.status(500).json({ error: err.message });
  }
};