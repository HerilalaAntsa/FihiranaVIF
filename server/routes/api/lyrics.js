const router = require("express").Router();
const { Op } = require("sequelize");
const { Lyric, Artist } = require("../../db/models");

// Get all lyric
router.get("/", async (req, res, next) => {
  try {
    // if (!req.user) {
    //   return res.sendStatus(401);
    // }
    const lyrics = await Lyric.findAll({
      // attributes: ["id"],
      include: {
        model: Artist,
        as: "artists"
      }
    });

    res.json(lyrics);
  } catch (error) {
    next(error);
  }
});


// find lyrics by title or content
router.get("/:term", async (req, res, next) => {
  try {
    const { term } = req.params;

    const lyrics = await Lyric.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.substring]: term,
            }
          },
          {
            content: {
              [Op.substring]: term,
            },
          },
          {
            '$artists.name$': {
              [Op.substring]: term,
            }
          }
        ]
      },
      include: {
        model: Artist,
        as: "artists",
      }
    });

    res.json(lyrics);
  } catch (error) {
    next(error);
    console.log(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    // console.log(req);
    // if (!req.user) {
    //   return res.sendStatus(401);
    // }
    const { title, content, artist, sequence } = req.body;

    const newArtist = artist;
    if (!newArtist.id) {
      newArtist = await Artist.create({ name: artist.name, photoUrl: '' });
    }

    const newLyric = await Lyric.create({
      artistId: newArtist.id,
      title,
      content,
      sequence
    });
    newLyric = { ...newLyric, artist: newArtist };
    res.json({ newLyric });
  } catch (error) {
    next(error);
  }
});


router.put("/", async (req, res, next) => {
  try {
    // console.log(req);
    // if (!req.user) {
    //   return res.sendStatus(401);
    // }
    const { lyricId, title, content, artist, sequence } = req.body;

    let newArtist = artist;
    if (!newArtist.id) {
      newArtist = await Artist.create({ name: artist.name, photoUrl: '' });
    }

    await Lyric.update(
      {
        artistId: newArtist.id,
        title,
        content,
        sequence
      },
      {
        where: {
          id: {
            [Op.eq]: lyricId
          }
        }
      }
    );
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;