import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
  {
    name: String,
    duration: Number,
    type: String,
    difficulty: String,

    module: String,
    topic: String,
    company: String,

    isPublished: {
      type: Boolean,
      default: false
    },

    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Test", testSchema);