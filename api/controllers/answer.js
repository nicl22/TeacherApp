import Answer from "../models/Answer.js";
import Question from "../models/Question.js";
import { createError } from "../utils/error.js";

export const createAnswer = async (req, res, next) => {
  const QuestionId = req.params.Questionid;
  const newAnswer = new Answer(req.body);

  try {
    const savedAnswer = await newAnswer.save();
    try {
      await Question.findByIdAndUpdate(QuestionId, {
        $push: { Answers: savedAnswer._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedAnswer);
  } catch (err) {
    next(err);
  }
};

export const updateAnswer = async (req, res, next) => {
  try {
    const updatedAnswer = await Answer.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedAnswer);
  } catch (err) {
    next(err);
  }
};
export const updateAnswerAvailability = async (req, res, next) => {
  try {
    await Answer.updateOne(
      { "AnswerNumbers._id": req.params.id },
      {
        $push: {
          "AnswerNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    res.status(200).json("Answer status has been updated.");
  } catch (err) {
    next(err);
  }
};
export const deleteAnswer = async (req, res, next) => {
  const QuestionId = req.params.Questionid;
  try {
    await Answer.findByIdAndDelete(req.params.id);
    try {
      await Question.findByIdAndUpdate(QuestionId, {
        $pull: { Answers: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Answer has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getAnswer = async (req, res, next) => {
  try {
    const Answer = await Answer.findById(req.params.id);
    res.status(200).json(Answer);
  } catch (err) {
    next(err);
  }
};
export const getAnswers = async (req, res, next) => {
  try {
    const Answers = await Answer.find();
    res.status(200).json(Answers);
  } catch (err) {
    next(err);
  }
};