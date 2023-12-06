module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    'Image',
    {
      boardId: {
        type: DataTypes.INTEGER,
      },
      imgLink: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'image',
      timestamps: false,
    }
  );
  return Image;
};
