const Sequelize = require("sequelize");
const db = require("../db");

const Artist = db.define("artist", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  photoUrl: {
    type: Sequelize.STRING
  },
});

module.exports = Artist;
