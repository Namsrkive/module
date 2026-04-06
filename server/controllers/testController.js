import Test from "../models/Test.js";

/* ================= CREATE TEST ================= */
export const createTest = async (req, res) => {
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
      questions: [] // will be added later in Test Builder
    });

    res.json({
      msg: "Test created successfully",
      test
    });

  } catch (err) {
    console.error("Create Test Error:", err);
    res.status(500).json({ error: err.message });
  }
};