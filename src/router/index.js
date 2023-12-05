const express = require('express');
const router = express.Router();
const board = require('./boardRouter');
const user = require('./userRouter');

router.use('/board', board);
router.use('/user', user);

module.exports = router;
