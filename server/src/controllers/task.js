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

export const pieData = async (req, res) => {
  const { date, empid } = req.body;
  const onlyDate = date.split('T')[0];

  try {
    const employee = await User.findById(empid).populate('tasks');
    const filteredTasks = employee.tasks.filter((task) => {
      const taskDate = new Date(task.startTime).toISOString().split('T')[0];
      return taskDate === onlyDate;
    });
    const timeByType = filteredTasks.reduce((acc, task) => {
      const { type, time } = task;
      if (acc[type]) {
        acc[type] += time;
      } else {
        acc[type] = time;
      }
      return acc;
    }, {});
    // Convert accumulated data to the desired response format
    const responseData = Object.entries(timeByType).map(([type, time]) => ({
      type,
      time,
    }));
    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
