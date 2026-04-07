import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    module: { type: String, required: true },
    topic: { type: String, required: true },

    type: {
      type: String,
      enum: ["mcq", "coding", "short"],
      default: "mcq"
    },

    question: { type: String, required: true },

    options: {
type: [String],
required: function () {
return this.type === "mcq";
}
},

    answer: { type: String, required: true },

    marks: { type: Number, default: 1 },
    negativeMarks: { type: Number, default: 0 },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy"
    },

    company: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("Question", questionSchema);