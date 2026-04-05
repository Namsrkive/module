import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js"; 

dotenv.config();

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/analytics", analyticsRoutes);

/* ================= TEST ROUTE ================= */
app.get("/", (req, res) => {
  res.send("API is running...");
});

/* ================= DB CONNECTION ================= */
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected ✅");

  app.listen(5000, () => {
    console.log("Server running on port 5000 🚀");
  });

})
.catch((err) => {
  console.error("MongoDB connection error:", err);
});