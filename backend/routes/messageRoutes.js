const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const protect = require('../middlewares/authMiddleware');

router.get('/:boardId', protect, async (req, res) => {
  try {
    const messages = await Message.find({ boardId: req.params.boardId }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener mensajes' });
  }
});

module.exports = router;
