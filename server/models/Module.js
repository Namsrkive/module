import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
  name: String, // Aptitude, DSA, DBMS, Core CS
  description: String,
  icon: String
});

export default mongoose.model("Module", moduleSchema);