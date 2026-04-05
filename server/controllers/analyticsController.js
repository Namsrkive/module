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
        : results.reduce((sum, r) => sum + r.score, 0) / totalTests;

    const moduleStats = {};

    results.forEach(r => {
      if (!r.module) return;

      if (!moduleStats[r.module]) {
        moduleStats[r.module] = { total: 0, count: 0 };
      }

      moduleStats[r.module].total += r.score;
      moduleStats[r.module].count++;
    });

    res.json({
      totalTests,
      avgScore,
      recentResults: results.slice(-5),
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