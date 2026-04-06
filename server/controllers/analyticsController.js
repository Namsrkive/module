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

    /* ✅ FIX MODULE STATS */
    const moduleStats = {};

    results.forEach(r => {
      if (!r.module) return;

      if (!moduleStats[r.module]) {
        moduleStats[r.module] = [];
      }

      moduleStats[r.module].push(r.score);
    });

    // convert to %
    Object.keys(moduleStats).forEach(module => {
      const arr = moduleStats[module];
      moduleStats[module] =
        Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
    });

    res.json({
      totalTests,
      avgScore,
      recentResults: results
        .slice(-5)
        .reverse()
        .map(r => ({
          testName: r.testName,
          score: r.score,
          date: r.createdAt
        })),
      moduleStats
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= ADMIN ANALYTICS ================= */
export const getAdminAnalytics = async (req, res) => {
  try {
    // 🔐 ONLY ADMIN
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const results = await Result.find().populate("user", "name email");

    const totalTests = results.length;

    const avgScore =
      totalTests === 0
        ? 0
        : results.reduce((sum, r) => sum + r.score, 0) / totalTests;

    const totalStudents = await User.countDocuments({ role: "student" });

    /* ---------- STUDENT STATS ---------- */
    const users = await User.find({ role: "student" });

    const students = await Promise.all(
      users.map(async (u) => {
        const userResults = await Result.find({ user: u._id });

        const tests = userResults.length;

        const avg =
          tests === 0
            ? 0
            : userResults.reduce((sum, r) => sum + r.score, 0) / tests;

        return {
          name: u.name,
          email: u.email,
          tests,
          avgScore: Math.round(avg)
        };
      })
    );

    res.json({
      totalTests,
      totalStudents,
      avgScore,
      totalViolations: 0,
      students,
      recentResults: results.slice(-10)
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const results = await Result.find().populate("user", "name");

    const map = {};

    results.forEach(r => {
      const name = r.user.name;

      if (!map[name]) {
        map[name] = [];
      }

      map[name].push(r.score);
    });

    const leaderboard = Object.entries(map).map(([name, scores]) => ({
      name,
      avgScore:
        Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    }));

    leaderboard.sort((a, b) => b.avgScore - a.avgScore);

    res.json(leaderboard);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};