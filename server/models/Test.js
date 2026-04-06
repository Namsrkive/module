import mongoose from "mongoose";

const TestSchema = new mongoose.Schema({
  name: String,
  module: String,
  topic: String,
  duration: Number,
  questions: Array,
});

export default mongoose.model("Test", TestSchema);