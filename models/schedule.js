const database = require("../utills/database");
const { DataTypes } = require("sequelize");

const Schedule = database.define("schedule", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  interviewId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Schedule;
