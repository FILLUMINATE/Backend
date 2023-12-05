const express = require('express');
const UserService = require('../service/userService');
const router = express.Router();

const userService = new UserService();

router.post('/join', async (req, res) => {
  const { userId, userPassword, userName } = req.body;
  const response = await userService.userJoin(userId, userPassword, userName);

  return res.sendStatus(response);
});

router.post('/', async (req, res) => {
  const result = await userService.userLogin(req.body);

  return res.status(200).send(result);
});
module.exports = router;
