import { createError } from "../error.js";
import Feedback from "../models/Feedback.js";
import Topic from "../models/Topic.js";

export const addFeedback = async (req, res, next) => {
  const newFeedback = new Feedback({ ...req.body, userId: req.user.id });
  try {
    const savedFeedback = await newFeedback.save();
    res.status(200).send(savedFeedback);
  } catch (err) {
    next(err);
  }
};

export const deleteFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.findById(res.params.id);
    const topic = await Topic.findById(res.params.id);
    if (req.user.id === feedback.userId || req.user.id === topic.userId) {
      await Feedback.findByIdAndDelete(req.params.id);
      res.status(200).json("The Feedback has been deleted.");
    } else {
      return next(createError(403, "You can delete ony your Feedback!"));
    }
  } catch (err) {
    next(err);
  }
};

export const getFeedbacks = async (req, res, next) => {
  try {
    const feedbacks = await Feedback.find({ topicId: req.params.topicId });
    res.status(200).json(feedbacks);
  } catch (err) {
    next(err);
  }
};