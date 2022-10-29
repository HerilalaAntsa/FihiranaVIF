const router = require("express").Router();
const { Op } = require("sequelize");
const { Artist } = require("../../db/models");


// Get all artists
router.get("/", async (req, res, next) => {
  try {
    // if (!req.user) {
    //   return res.sendStatus(401);
    // }
    const artists = await Artist.findAll();

    res.json(artists);
  } catch (error) {
    next(error);
  }
});

// Find artists by name
router.get("/:name", async (req, res, next) => {
    try {
    //   if (!req.user) {
    //     return res.sendStatus(401);
    //   }
      const { name } = req.params;
  
      const artists = await Artist.findAll({
        where: {
          name: {
            [Op.substring]: name,
          }
        },
      });
  
      res.json(artists);
    } catch (error) {
      next(error);
    }
  });


module.exports = router;