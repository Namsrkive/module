import Result from "../models/Result.js";
import User from "../models/User.js";

/* ================= STUDENT ANALYTICS ================= */
export const getStudentAnalytics = async (req, res) => {
  try {
    const results = await Result.find({ user: req.user.id });

    const totalTests = results.length;

    const avgScore =
      totalTests === 0
        ? 0
        : Math.round(
            results.reduce((sum, r) => sum + r.score, 0) / totalTests
          );

    /* MODULE STATS */
    const moduleStats = {};

    results.forEach((r) => {
      if (!r.module) return;

      if (!moduleStats[r.module]) {
        moduleStats[r.module] = [];
      }

      moduleStats[r.module].push(r.score);
    });

    Object.keys(moduleStats).forEach((module) => {
      const arr = moduleStats[module];
      moduleStats[module] = Math.round(
        arr.reduce((a, b) => a + b, 0) / arr.length
      );
    });

    res.json({
      totalTests,
      avgScore,
      recentResults: results
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
        .map((r) => ({
          testName: r.testName,
          score: r.score,
          date: r.createdAt,
        })),
      moduleStats,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= ADMIN ANALYTICS ================= */
export const getAdminAnalytics = async (req, res) => {
  try {
    /* 🔐 ADMIN CHECK */
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    /* FETCH RESULTS */
    const results = await Result.find().populate("user", "name email");

    const totalTests = results.length;

    const avgScore =
      totalTests === 0
        ? 0
        : Math.round(
            results.reduce((sum, r) => sum + r.score, 0) / totalTests
          );

    const totalStudents = await User.countDocuments({ role: "student" });

    /* OPTIMIZED STUDENT STATS */
    const studentMap = {};

    results.forEach((r) => {
      if (!r.user) return;

      const id = r.user._id;

      if (!studentMap[id]) {
        studentMap[id] = {
          name: r.user.name,
          email: r.user.email,
          tests: 0,
          totalScore: 0,
        };
      }

      studentMap[id].tests += 1;
      studentMap[id].totalScore += r.score;
    });

    const students = Object.values(studentMap).map((s) => ({
      name: s.name,
      email: s.email,
      tests: s.tests,
      avgScore: Math.round(s.totalScore / s.tests),
    }));

    /* RECENT RESULTS */
    const recentResults = await Result.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("user", "name");

    res.json({
      totalTests,
      totalStudents,
      avgScore,
      totalViolations: 0, // can extend later
      students,
      recentResults,
    });
  } catch (err) {
    console.error("Admin Analytics Error:", err);
    res.status(500).json({ error: err.message });
  }
};

/* ================= LEADERBOARD ================= */
export const getLeaderboard = async (req, res) => {
  try {
    const results = await Result.find().populate("user", "name");

    const map = {};

    results.forEach((r) => {
      if (!r.user) return;

      const name = r.user.name;

      if (!map[name]) {
        map[name] = [];
      }

      map[name].push(r.score);
    });

    const leaderboard = Object.entries(map).map(([name, scores]) => ({
      name,
      avgScore: Math.round(
        scores.reduce((a, b) => a + b, 0) / scores.length
      ),
    }));

    leaderboard.sort((a, b) => b.avgScore - a.avgScore);

    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};