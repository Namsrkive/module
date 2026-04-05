import express from "express";
import Result from "../models/Result.js";

const router = express.Router();

router.get("/student", async (req, res) => {
  try {
    const results = await Result.find();

    const totalTests = results.length;

    const avgScore =
      results.reduce((acc, r) => acc + r.score, 0) / (totalTests || 1);

    const avgAccuracy =
      results.reduce((acc, r) => acc + r.accuracy, 0) / (totalTests || 1);

    const moduleStats = {};

    results.forEach((r) => {
      if (!moduleStats[r.module]) {
        moduleStats[r.module] = { total: 0, count: 0 };
      }
      moduleStats[r.module].total += r.score;
      moduleStats[r.module].count += 1;
    });

    res.json({
      totalTests,
      avgScore,
      avgAccuracy,
      moduleStats,
      recentResults: results.slice(-5),
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/admin", async (req, res) => {
  try {
    const results = await Result.find().populate("userId", "name email");

    const totalTests = results.length;

    const studentsMap = {};

    results.forEach((r) => {
      const id = r.userId?._id;

      if (!studentsMap[id]) {
        studentsMap[id] = {
          name: r.userId?.name || "Unknown",
          email: r.userId?.email || "N/A",
          totalScore: 0,
          tests: 0,
        };
      }

      studentsMap[id].totalScore += r.score;
      studentsMap[id].tests += 1;
    });

    const students = Object.values(studentsMap).map((s) => ({
      ...s,
      avgScore: Math.round(s.totalScore / s.tests),
    }));

    const avgScore =
      results.reduce((acc, r) => acc + r.score, 0) / (totalTests || 1);

    // violations
    let totalViolations = 0;

    results.forEach((r) => {
      totalViolations += r.violations?.tabSwitch || 0;
      totalViolations += r.violations?.faceMissing || 0;
    });

    res.json({
      totalStudents: students.length,
      totalTests,
      avgScore,
      totalViolations,
      students,
      recentResults: results.slice(-10),
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;