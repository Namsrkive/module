import Test from "../models/Test.js";
import Question from "../models/Question.js";

/* ================= COMPANY TEST SEEDER ================= */
export const seedCompanyTest = async (req, res) => {
  try {
    const { company } = req.body;

    if (!company) {
      return res.status(400).json({ msg: "Company required" });
    }

    /* ================= COMPANY PATTERNS ================= */
    const patterns = {
      TCS: [
        { module: "Aptitude", topic: "Quant Basics", difficulty: "easy", count: 10 },
        { module: "Aptitude", topic: "Logical Reasoning", difficulty: "medium", count: 10 },
        { module: "Programming", topic: "OOP", difficulty: "easy", count: 5 }
      ],

      IBM: [
        { module: "DSA", topic: "Arrays", difficulty: "medium", count: 10 },
        { module: "DSA", topic: "Trees", difficulty: "hard", count: 5 },
        { module: "Aptitude", topic: "Logical Reasoning", difficulty: "medium", count: 5 }
      ],

      Accenture: [
        { module: "Aptitude", topic: "Probability", difficulty: "easy", count: 10 },
        { module: "Programming", topic: "OOP", difficulty: "medium", count: 5 }
      ],

      Wipro: [
        { module: "Aptitude", topic: "Quant Basics", difficulty: "easy", count: 10 },
        { module: "DBMS", topic: "SQL Queries", difficulty: "medium", count: 5 }
      ],

      Deloitte: [
        { module: "Aptitude", topic: "Logical Reasoning", difficulty: "medium", count: 10 },
        { module: "Programming", topic: "Computer Networks", difficulty: "medium", count: 5 }
      ]
    };

    const sections = patterns[company];

    if (!sections) {
      return res.status(400).json({ msg: "Invalid company" });
    }

    /* ================= CREATE TEST ================= */
    const test = await Test.create({
      name: `${company} Mock Test`,
      duration: 60,
      type: "company",
      difficulty: "medium",
      company,
      questions: [],
      isPublished: false
    });

    let questions = [];

    for (let sec of sections) {
      const found = await Question.find({
        module: sec.module,
        topic: sec.topic,
        difficulty: sec.difficulty
      }).limit(sec.count);

      questions.push(...found.map(q => q._id));
    }

    /* ================= UPDATE TEST ================= */
    test.questions = questions;
    await test.save();

    res.json({
      msg: `${company} test created successfully`,
      test
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Seeder failed" });
  }
};