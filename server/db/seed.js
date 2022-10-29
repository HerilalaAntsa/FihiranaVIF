const Artist = require("./models/artist");
const db = require("./db");
const Lyric = require("./models/lyric");
const { User } = require("./models");
const data = require("./db-data");

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  const vdlAdmin = await User.create({
    username: "vdlAdmin",
    email: "vdladmin@email.com",
    password: "123456",
    photoUrl:
      "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914467/messenger/thomas_kwzerk.png",
  });

  const santiago = await Artist.create({
    name: "santiago",
    photoUrl:
      "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914466/messenger/775db5e79c5294846949f1f55059b53317f51e30_s3back.png",
  });
  const Rojo = await Artist.create({
    name: "Rojo N.A",
    photoUrl:
      "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914466/messenger/775db5e79c5294846949f1f55059b53317f51e30_s3back.png",
  });
  const miller = await Artist.create({
    name: "miller",
    photoUrl:
      "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914466/messenger/775db5e79c5294846949f1f55059b53317f51e30_s3back.png",
  });

  for (let i = 0; i < data.length; i++) {
    await Lyric.create({
      title: data[i].title,
      sequence: data[i].sequence,
      content: data[i].content,
    });
  }

  // await Lyric.create({
  //   artistId: santiago.id,
  //   title: "Masina",
  //   sequence: "160",
  //   content: " <br><br><br><br>Haleloia (2)<br><br>Ho an�ny Tompo<br><br>Ilay Masina Indrindra<br><br>Haleloia (2),<br><br>Masina (2) Ianao Tompo<br><br>�Lay Ray Tsitoha<br><br>Mendrika Ianao (2)<br><br>Ry Ilay Zanak�ondry<br><br>Amen<br>"
  // });
  // await Lyric.create({
  //   artistId: santiago.id,
  //   title: "Masina",
  //   sequence: "161",
  //   content: " <br><br><br><br>Haleloia (2)<br><br>Ho an�ny Tompo<br><br>Ilay Masina Indrindra<br><br>Haleloia (2),<br><br>Masina (2) Ianao Tompo<br><br>�Lay Ray Tsitoha<br><br>Mendrika Ianao (2)<br><br>Ry Ilay Zanak�ondry<br><br>Amen<br>"
  // });

  // for (let i = 0; i < 3; i++) {
  //   await Lyric.create({
  //     artistId: Rojo.id,
  //     title: "Masina",
  //     sequence: "162",
  //     content: " <br><br><br><br>Haleloia (2)<br><br>Ho an�ny Tompo<br><br>Ilay Masina Indrindra<br><br>Haleloia (2),<br><br>Masina (2) Ianao Tompo<br><br>�Lay Ray Tsitoha<br><br>Mendrika Ianao (2)<br><br>Ry Ilay Zanak�ondry<br><br>Amen<br>"
  //   });
  // }

  console.log(`seeded lyrics and artists`);
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

if (module === require.main) {
  runSeed();
}
