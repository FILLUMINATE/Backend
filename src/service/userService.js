const { User } = require('../database/models');
const fs = require('fs');
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
    const { userId, userPassword } = userDTO;
    try {
      if (!userId || !userPassword) return 400;

      const userExist = await User.findAll({ where: { userId } });
      if (!userExist || userExist.length === 0) return 404;
      const result = await bcrypt.compare(
        userPassword,
        userExist[0].userPassword
      );
      if (!result) return 401;

      return 200;
    } catch (err) {
      console.log(err);
      return 500;
    }
  }
}

module.exports = UserService;
