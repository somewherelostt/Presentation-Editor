const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Slide = sequelize.define("Slide", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "# New Slide\n\nStart typing here...",
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    layout: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default",
    },
    presentationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  return Slide;
};
