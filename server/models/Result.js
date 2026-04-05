import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  testId: String,

  score: Number,
  totalQuestions: Number,
  correctAnswers: Number,

  // 🔥 NEW (important for analytics)
  module: String, // Aptitude, DSA, DBMS, Programming
  company: String, // TCS, IBM etc (optional)

  timeTaken: Number,
  accuracy: Number,

  // topic-level breakdown
  topics: [
    {
      name: String,
      correct: Number,
      total: Number
    }
  ],

  violations: {
    tabSwitch: Number,
    faceMissing: Number,
    multipleFaces: Number
  },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Result", resultSchema);