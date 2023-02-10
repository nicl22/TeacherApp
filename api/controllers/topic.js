import { createError } from "../error.js";
import Topic from "../models/Topic.js";
import Schedule from "../models/Schedule.js";

export const addTopic = async (req, res, next) => {
  const newTopic = new Topic({ ...req.body, userId: req.user.id });
  try {
    const savedTopic = await newTopic.save();
    res.status(200).send(savedTopic);
  } catch (err) {
    next(err);
  }
};

export const deleteTopic = async (req, res, next) => {
  try {
    const topic = await Topic.findById(res.params.id);
    const schedule = await Schedule.findById(res.params.id);
    if (req.user.id === topic.userId || req.user.id === schedule.userId) {
      await Topic.findByIdAndDelete(req.params.id);
      res.status(200).json("The Topic has been deleted.");
    } else {
      return next(createError(403, "You can delete ony your Topic!"));
    }
  } catch (err) {
    next(err);
  }
};

export const getTopics = async (req, res, next) => {
  try {
    const topics = await Topic.find({ scheduleId: req.params.scheduleId });
    res.status(200).json(topics);
  } catch (err) {
    next(err);
  }
};