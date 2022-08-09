const Sequelize = require("sequelize");
const db = require("../db");

const Lyric = db.define("lyric", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = Lyric;
