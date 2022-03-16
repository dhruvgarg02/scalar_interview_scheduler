const Sequelize = require("sequelize");

const DATABASE_URL = process.env.DATABASE_URL || "";
const database = new Sequelize(DATABASE_URL, {
  logging: false,
});

module.exports = database;
