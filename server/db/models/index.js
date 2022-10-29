const User = require("./user");
const Artist = require("./artist");
const Lyric = require("./lyric");

// associations

Lyric.belongsTo(Artist, {
  as: 'artists',
  foreignKey: 'artistId'
});


module.exports = {
  User,
  Artist,
  Lyric
};
