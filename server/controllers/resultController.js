import Result from "../models/Result.js";

/* SAVE RESULT */
export const saveResult = async (req, res) => {
  try {
    const { testId, score, total, answers } = req.body;

    // VALIDATION
    if (!testId || score === undefined || total === undefined) {
      return res.status(400).json({ error: "Missing fields" });
    }

    if (answers && !Array.isArray(answers)) {
      return res.status(400).json({ error: "Answers must be array" });
    }

    // SAFE handling (fixes your error)
    const safeAnswers = answers || [];

    // Optional processing (no crash now)
    safeAnswers.forEach(ans => {
      // you can process if needed
    });

    const result = new Result({
      user: req.user.id,
      testId,
      score,
      total,
      answers: safeAnswers
    });

    await result.save();

    res.json({ msg: "Result saved", result });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/* GET LATEST RESULT */
export const getLatestResult = async (req, res) => {
  try {
    const result = await Result.findOne({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json(result);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};