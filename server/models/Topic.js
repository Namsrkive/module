// models/Topic.js
import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  name: String, // Arrays, Trees, OS, SQL
  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module"
  }
});

export default mongoose.model("Topic", topicSchema);