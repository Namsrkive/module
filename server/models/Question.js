import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],

  // change to number if you're storing index (recommended)
  answer: Number,

  // 🔥 NEW FIELDS
  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module"
  },

  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic"
  },

  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"]
  },

  companyTags: [
    {
      type: String
    }
  ]
});

export default mongoose.model("Question", questionSchema);