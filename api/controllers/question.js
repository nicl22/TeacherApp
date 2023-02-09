import { createError } from "../error.js";
import Question from "../models/Question.js";
import Feedback from "../models/feedbackId.js";

export const createQuestion = async (req, res, next) => {
    const feedbackId = req.params.feedbackid;
    const newQuestion = new Question(req.body);
  
    try {
      const savedQuestion = await newQuestion.save();
      try {
        await Feedback.findByIdAndUpdate(FeedbackId, {
          $push: { questions: savedQuestion._id },
        });
      } catch (err) {
        next(err);
      }
      res.status(200).json(savedQuestion);
    } catch (err) {
      next(err);
    }
  };

  export const deleteQuestion= async (req, res, next) => {
    const feedbackId = req.params.feedbackid;
    try {
      await Room.findByIdAndDelete(req.params.id);
      try {Feedback.findByIdAndUpdate(feedbackId, {
          $pull: { questions: req.params.id },
        });
      } catch (err) {
        next(err);
      }
      res.status(200).json("Question has been deleted.");
    } catch (err) {
      next(err);
    }
  };

export const getQuestions = async (req, res, next) => {
  try {
    const questions = await Question.find({ feedbackIdId: req.params.feedbackIdId });
    res.status(200).json(questions);
  } catch (err) {
    next(err);
  }
};