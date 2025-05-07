const express = require('express');
const { createBoard, getBoards } = require('../controllers/boardController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', protect, createBoard);
router.get('/', protect, getBoards);

module.exports = router;


