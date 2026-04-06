import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  title: String,

  type: {
    type: String,
    enum: ["module", "company"]
  },

  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module"
  },

  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic"
  },

  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company"
  },

  duration: Number,

  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question"
    }
  ]
});

export default mongoose.model("Test", testSchema);