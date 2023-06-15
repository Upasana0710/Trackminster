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

    // Sort the accumulated data by type in a consistent order
    // eslint-disable-next-line max-len
    const sortedData = Object.entries(timeByType).sort(([typeA], [typeB]) => typeA.localeCompare(typeB));

    // Convert sorted data to the desired response format
    const responseData = sortedData.map(([type, time]) => ({ type, time }));

    res.json(responseData);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const barData = async (req, res) => {
  const { empid } = req.body;

  try {
    const employee = await User.findById(empid).populate('tasks');

    // Filter tasks for the current week
    const currentDate = new Date();
    const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
    // eslint-disable-next-line max-len
    const endOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 6));
    const filteredTasks = employee.tasks.filter((task) => {
      const taskDate = new Date(task.startTime);
      return taskDate >= startOfWeek && taskDate <= endOfWeek;
    });

    // Calculate total time for each task type
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
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
