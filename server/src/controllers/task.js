import Task from '../models/task.js';
import User from '../models/user.js';

export const createTask = async (req, res) => {
  const task = req.body;
  try {
    const newTask = new Task({ ...task, employee: req.user });
    await newTask.save();
    await User.findByIdAndUpdate(req.user, { $push: { tasks: newTask._id } }, { new: true });
    res.status(200).json(newTask);
  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
  }
};
