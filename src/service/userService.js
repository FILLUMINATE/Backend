require('dotenv').config();
const { User } = require('../database/models');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

class UserService {
  async userJoin(userId, userPassword, userName) {
    if (!userId || !userPassword || !userName) return 400;

    try {
      const userExist = await User.findAll({ where: { userId } });
      if (userExist.length !== 0) return 409;

      const hashedUserPassword = bcrypt.hashSync(userPassword, 10);

      await User.create({ userId, userPassword: hashedUserPassword, userName });

      return 200;
    } catch (err) {
      console.log(err);
      return 500;
    }
  }

  async userLogin(userDTO) {
    try {
      const { userId, userPassword } = userDTO;

      if (!userId || !userPassword)
        return { status: 400, message: 'Bad Request' };

      const userExist = await User.findOne({ where: { userId } });
      if (!userExist) return { status: 404, message: 'User not found' };

      const result = await bcrypt.compare(userPassword, userExist.userPassword);
      if (!result) return { status: 401, message: 'Incorrect password' };

      const user = { userId, userName: userExist.userName };
      const secretKey = process.env.SECRET_KEY;
      const token = jwt.sign(user, secretKey, { expiresIn: '12h' });

      return { status: 200, user, token };
    } catch (err) {
      console.error(err);
      return { status: 500, message: 'Internal Server Error' };
    }
  }
}

module.exports = UserService;
