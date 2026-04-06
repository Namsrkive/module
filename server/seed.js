import mongoose from "mongoose";
import fs from "fs";
import dotenv from "dotenv";
import Question from "./models/Question.js";
import Test from "./models/Test.js";

dotenv.config();

// ✅ read questions.json
const questions = JSON.parse(
  fs.readFileSync("./data/questions.json", "utf-8")
);

const seed = async () => {
  try {
    console.log("Connecting to DB...");

    await mongoose.connect(process.env.MONGO_URI, {
      tls: true,
      retryWrites: true,
      w: "majority"
    });

    console.log("Connected to MongoDB");

    // clear old data
    await Question.deleteMany();
    await Test.deleteMany();

    console.log("Old data cleared");

    // insert questions
    await Question.insertMany(questions);

    console.log(`Inserted ${questions.length} questions`);

    // create company tests
    const tests = [
      { name: "TCS Mock Test", duration: 90, type: "company", company: "TCS" },
      { name: "IBM Mock Test", duration: 90, type: "company", company: "IBM" },
      { name: "Accenture Mock Test", duration: 90, type: "company", company: "Accenture" },
      { name: "Wipro Mock Test", duration: 90, type: "company", company: "Wipro" },
      { name: "Deloitte Mock Test", duration: 90, type: "company", company: "Deloitte" }
    ];

    await Test.insertMany(tests);

    console.log("Tests created");

    console.log("✅ Data Seeded Successfully");
    process.exit();

  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);

    console.log("Questions loaded:", questions.length);
  }
};

seed();