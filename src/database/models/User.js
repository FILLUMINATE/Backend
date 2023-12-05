module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      userId: {
        type: DataTypes.STRING(255),
        primaryKey: true,
      },

      userPassword: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },

      userName: {
        type: DataTypes.STRING(255),
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
