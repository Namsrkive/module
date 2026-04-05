import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  testId: {
    type: String,
    required: true
  },
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