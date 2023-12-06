require('dotenv').config();
const Sequelize = require('sequelize');
const config = require('../config')[process.env.NODE_ENV || 'development'];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
  {
    host: process.env.DB_PORT,
  }
);

db.User = require('./User')(sequelize, Sequelize);
db.Board = require('./Board')(sequelize, Sequelize);
db.Image = require('./Image')(sequelize, Sequelize);

Object.values(db).forEach((model) => {
  if (model.associate) {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
