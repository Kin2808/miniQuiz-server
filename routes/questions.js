const express = require("express");
const { default: mongoose } = require("mongoose");
const Answer = require("../models/answer");
const Question = require("../models/question");
const router = express.Router();

mongoose.connect("mongodb://127.0.0.1:27017/quiz");

router.get("/", async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const question = new Question(data);
    await question.save();
    res.status(200).json(question)
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Question.findByIdAndDelete(id);
    res.status(200);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/answer", async (req, res) => {
  try {
    const data = req.body;
    const answer = new Answer(data);
    await answer.save();
    res.status(200).json(answer);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
