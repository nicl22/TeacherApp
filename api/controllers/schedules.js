import Schedule from "../models/Schedule.js";
import Class from "../models/Class.js";
import { createError } from "../utils/error.js";

export const createSchedule = async (req, res, next) => {
  const ClassId = req.params.Classid;
  const newSchedule = new Schedule(req.body);

  try {
    const savedSchedule = await newSchedule.save();
    try {
      await Class.findByIdAndUpdate(ClassId, {
        $push: { Schedules: savedSchedule._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedSchedule);
  } catch (err) {
    next(err);
  }
};

export const updateSchedule = async (req, res, next) => {
  try {
    const updatedSchedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedSchedule);
  } catch (err) {
    next(err);
  }
};
export const updateScheduleAvailability = async (req, res, next) => {
  try {
    await Schedule.updateOne(
      { "ScheduleNumbers._id": req.params.id },
      {
        $push: {
          "ScheduleNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    res.status(200).json("Schedule status has been updated.");
  } catch (err) {
    next(err);
  }
};
export const deleteSchedule = async (req, res, next) => {
  const ClassId = req.params.Classid;
  try {
    await Schedule.findByIdAndDelete(req.params.id);
    try {
      await Class.findByIdAndUpdate(ClassId, {
        $pull: { Schedules: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Schedule has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getSchedule = async (req, res, next) => {
  try {
    const Schedule = await Schedule.findById(req.params.id);
    res.status(200).json(Schedule);
  } catch (err) {
    next(err);
  }
};