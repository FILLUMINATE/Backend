const { User } = require('../database/models');
const fs = require('fs');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

class UserService {
  async userJoin(userId, userPassword, userName) {
    if (!userId || !userPassword || !userName) return 400;
    try {
      const userExist = await User.findAll({ where: { userId } });
      if (userExist) return 409;
      bcrypt.hash(userPassword, 10);
      await User.create({ userId, userPassword, userName });
      return 200;
    } catch (err) {
      console.log(err);
      return 500;
    }
  }
}

module.exports = UserService;
