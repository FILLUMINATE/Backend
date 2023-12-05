const express = require('express');
const UserService = require('../service/userService');
const router = express.Router();

const userService = new UserService();
module.exports = router;
