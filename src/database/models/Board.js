module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define(
    'Board',
    {
      boardId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        default: 1,
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      description: {
        type: DataTypes.STRING(3000),
        allowNull: false,
      },

      period: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      isNotice: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      support: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      hashtag: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
    },
    {
      tableName: 'board',
      timestamps: false,
    }
  );
  return Board;
};
