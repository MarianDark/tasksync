const Task = require('../models/Task');

const createTask = async (req, res) => {
  const { title, description, boardId } = req.body;

  try {
    const task = await Task.create({
      title,
      description,
      board: boardId,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear tarea' });
  }
};

const getTasksByBoard = async (req, res) => {
  try {
    const tasks = await Task.find({ board: req.params.boardId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener tareas' });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar tarea' });
  }
};

module.exports = { createTask, getTasksByBoard, updateTaskStatus };
// This code defines a controller for managing tasks in a Kanban board application. It includes functions to create a task, get tasks by board ID, and update the status of a task. Each function interacts with a MongoDB database using Mongoose models. The functions handle errors and send appropriate responses to the client.
// The createTask function creates a new task with a title, description, and board ID. The getTasksByBoard function retrieves all tasks associated with a specific board ID. The updateTaskStatus function updates the status of a task based on its ID. Each function uses async/await syntax for handling asynchronous operations and returns JSON responses.