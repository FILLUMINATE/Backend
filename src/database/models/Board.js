module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define(
    "Board",
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

      image: {
        type: DataTypes.STRING(10000),
        allowNull: true,
      },

      description: {
        type: DataTypes.STRING(10000),
        allowNull: false,
      },
    },
    {
      tableName: "board",
      timestamps: false,
    }
  );
  return Board;
};
