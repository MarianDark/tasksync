const Board = require('../models/Board');

const createBoard = async (req, res) => {
  try {
    const board = await Board.create({
      title: req.body.title,
      owner: req.user._id,
      members: [req.user._id],
    });
    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear tablero' });
  }
};

const getBoards = async (req, res) => {
  try {
    const boards = await Board.find({ members: req.user._id });
    res.json(boards);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener tableros' });
  }
};

module.exports = { createBoard, getBoards };
