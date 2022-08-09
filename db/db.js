const Sequelize = require("sequelize");

process.env.SESSION_SECRET = 'Antsalol1!';

const db = new Sequelize(process.env.DATABASE_URL || "postgres://postgres:Antsalol1@localhost:5432/fihiranavif", {
  logging: true
});

module.exports = db;