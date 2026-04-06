import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js"; 
import testRoutes from "./routes/testRoutes.js";
import moduleRoutes from "./routes/moduleRoutes.js";
import topicRoutes from "./routes/topicRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import seedRoutes from "./routes/seedRoutes.js";



dotenv.config();

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/seed", seedRoutes);

/* ================= TEST ROUTE ================= */
app.get("/", (req, res) => {
  res.send("API is running...");
});

/* ================= DB CONNECTION ================= */
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });