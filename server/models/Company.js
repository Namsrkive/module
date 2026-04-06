// models/Company.js
import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: String, // TCS, Accenture
  logo: String,
  description: String,
  pattern: {
    aptitudeWeight: Number,
    dsaWeight: Number,
    coreWeight: Number
  }
});

export default mongoose.model("Company", companySchema);