import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
  {
    name: String,
    duration: Number,
    type: String, // module | company
    difficulty: String,

    module: String,
    topic: String,
    company: String,

    questions: [
      {
        question: String,
        options: [String],
        answer: String
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Test", testSchema);