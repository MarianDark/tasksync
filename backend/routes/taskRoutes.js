const express = require('express');
const {
  createTask,
  getTasksByBoard,
  updateTaskStatus,
} = require('../controllers/taskController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', protect, createTask);
router.get('/:boardId', protect, getTasksByBoard);
router.put('/:id/status', protect, updateTaskStatus);

module.exports = router;

router.put('/:id/update', protect, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'No encontrada' });

  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;

  const updated = await task.save();
  res.json(updated);
});

router.delete('/:id', protect, async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ message: 'No encontrada' });
  res.json({ message: 'Tarea eliminada' });
});
