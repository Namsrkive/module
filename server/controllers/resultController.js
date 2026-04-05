import Result from "../models/Result.js";

/* SAVE RESULT */
export const saveResult = async (req, res) => {
  try {
    const { userId, score, totalQuestions, correctAnswers, module } = req.body;

    if (!userId) {
      return res.status(400).json({ msg: "User ID missing" });
    }

    const result = await Result.create({
      userId,
      score,
      totalQuestions,
      correctAnswers,
      module,
      total: totalQuestions,        
      accuracy: totalQuestions > 0
        ? Math.round((correctAnswers / totalQuestions) * 100)
        : 0
    });

    res.json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error saving result" });
  }
};

/* GET USER RESULTS */
export const getResults = async (req, res) => {
  try {
    const results = await Result.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });   

    res.json(results);

  } catch (err) {
    res.status(500).json({ msg: "Error fetching results" });
  }
};