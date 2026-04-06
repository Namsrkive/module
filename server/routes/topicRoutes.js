import express from "express";
import Topic from "../models/Topic.js";

const router = express.Router();

// CREATE TOPIC
router.post("/", async (req, res) => {
  const topic = await Topic.create(req.body);
  res.json(topic);
});

// GET TOPICS BY MODULE
router.get("/:moduleId", async (req, res) => {
  const topics = await Topic.find({
    module: req.params.moduleId
  });
  res.json(topics);
});

export default router;