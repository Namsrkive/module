import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  score: Number,
  total: Number,
  module: String,
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Result", resultSchema);