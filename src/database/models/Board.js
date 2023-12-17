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

      writedDate: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      isNotice: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      tableName: 'board',
      timestamps: false,
    }
  );
  return Board;
};
