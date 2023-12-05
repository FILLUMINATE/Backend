module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        default: 1,
      },

      userPassword: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      userName: {
        type: DataTypes.STRING(3000),
        allowNull: false,
      },
    },
    {
      tableName: 'user',
      timestamps: false,
    }
  );
  return User;
};
