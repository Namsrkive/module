import Result from "../models/Result.js";

/* SAVE RESULT */
export const saveResult = async (req, res) => {
  try {
    const { userId, score, total, module } = req.body;

    const result = await Result.create({
      userId,
      score,
      total,
      module
    });

    res.json(result);

  } catch (err) {
    res.status(500).json({ msg: "Error saving result" });
  }
};

/* GET USER RESULTS */
export const getResults = async (req, res) => {
  try {
    const results = await Result.find({ userId: req.params.userId })
      .sort({ date: -1 });

    res.json(results);

  } catch (err) {
    res.status(500).json({ msg: "Error fetching results" });
  }
};