import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  testId: {
    type: mongoose.Schema.Types.ObjectId,   // ✅ FIX (was String)
    ref: "Test",
    required: true
  },

  testName: String,   // ✅ ADD
  module: String,     // ✅ ADD (for analytics)

  score: Number,
  total: Number,

  answers: [
    {
      questionId: String,
      selectedOption: String
    }
  ]

}, { timestamps: true });

export default mongoose.model("Result", resultSchema);