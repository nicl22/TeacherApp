import Class from "../models/Class.js";
import Schedule from "../models/Schedule.js";

export const createClass = async (req, res, next) => {
  const newClass= new Class(req.body);

  try {
    const savedClass = await newClass.save();
    res.status(200).json(savedClass);
  } catch (err) {
    next(err);
  }
};
export const updateClass = async (req, res, next) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedClass);
  } catch (err) {
    next(err);
  }
};
export const deleteClass = async (req, res, next) => {
  try {
    await Class.findByIdAndDelete(req.params.id);
    res.status(200).json("Class has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getClass = async (req, res, next) => {
  try {
    const Class = await Class.findById(req.params.id);
    res.status(200).json(Class);
  } catch (err) {
    next(err);
  }
};
export const getClasses = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const Classes = await Class.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(Classes);
  } catch (err) {
    next(err);
  }
};

export const getClassSchedule = async (req, res, next) => {
  try {
    const classe = await Class.findById(req.params.id);
    const list = await Promise.all(
      classe.schedules.map((schedule) => {
        return Schedule.findById(schedule);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};


