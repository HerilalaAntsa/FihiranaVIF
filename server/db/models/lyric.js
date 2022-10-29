const Sequelize = require("sequelize");
const db = require("../db");

const Lyric = db.define("lyric", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  sequence: {
    type: Sequelize.INTEGER,
    allowNull: true,
    unique: true
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  }
});

Lyric.search = function (query) {
  if (db.options.dialect !== 'postgres') {
    console.log('Search is only implemented on POSTGRES database');
    return;
  }

  var Lyric = this;

  query = db.getQueryInterface().escape(query);
  console.log(query);

  return db
    .query('SELECT * FROM "' + Lyric.tableName + '" WHERE "' + Lyric.getSearchVector() + '" @@ plainto_tsquery(\'english\', ' + query + ')', Lyric);
}

module.exports = Lyric;
