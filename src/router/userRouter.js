const express = require('express');
const UserService = require('../service/userService');
const router = express.Router();

const userService = new UserService();

router.post('/join', async (req, res) => {
  const { userId, userPassword, userName } = req.body;
  const response = await userService.userJoin(userId, userPassword, userName);

  res.sendStatus(response);
});
module.exports = router;
