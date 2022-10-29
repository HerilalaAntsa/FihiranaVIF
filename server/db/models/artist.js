const Sequelize = require("sequelize");
const db = require("../db");

const Artist = db.define("artist", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  photoUrl: {
    type: Sequelize.STRING
  },
});

module.exports = Artist;
