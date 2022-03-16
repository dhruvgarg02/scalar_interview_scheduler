const database = require("../utills/database");
const { DataTypes } = require("sequelize");

const Interview = database.define("interview", {
  start: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  participants: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: false,
  }
});

module.exports = Interview;
