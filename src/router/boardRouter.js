const express = require('express');
const BoardService = require('../service/boardService');
const router = express.Router();

const boardService = new BoardService();

module.exports = router;
