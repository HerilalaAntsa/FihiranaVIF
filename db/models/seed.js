const Artist = require("./artist");
const db = require("./db");
const Lyric = require("./lyric");
const { User } = require("./models");

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  const thomas = await User.create({
    username: "thomas",
    email: "thomas@email.com",
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

  await Lyric.create({
    artistId: santiago.id,
    title: "Where are you from",
    content: "Aza omena tsiny raha toa mi-decl' be zah' fa tena te hitory<br /> Iray volana katroka ilay nahalalako anao izay no tsy nahita tory<br /> Mivadibadik'ondana ny andro sy ny alina tsy voahavako intsony<br /> Nangalarinao any ho'aho ny foko sy ny saiko ka ataoko akory?<br /> <br /> Kanefa tsy ahoako, tsy ahoako ô, tsy ahoako,<br /> Vao mainka ary ho ataoko, ho ataoko ô, ho ataoko ô.<br /> Tena mitapy aminao izy f'aza jerena fotsiny eo ô!<br /> To'dia amboary ny valizy fa rahariva izy haka anao eo ô!<br /> Raha ny vavan'ny mpanakivy hono tsy hahasakana anazy eo ô!<br /> F'ianao ilay tena izy, Jesôsy aza maka anareo ô.<br /> <br /> (Ameza!)<br /> <br /> Dia hozy ianao hoe izany ve dia marina sa 'zah mihitsy no beau parleur?<br /> Sa tianao hotabatabaiko amin'ny micro sy ny haut-parleur?<br /> Aza omena tsiny zah raha toa mi-rouler 'rrrr' fa tena rarakivy e.<br /> Sasa-miandry anao foana mijerijery lera, maraina atoandro hariva e.<br /> <br />"
  });
  await Lyric.create({
    artistId: santiago.id,
    title: "Chanson 2",
    content: "Aza omena tsiny raha toa mi-decl' be zah' fa tena te hitory<br /> Iray volana katroka ilay nahalalako anao izay no tsy nahita tory<br /> Mivadibadik'ondana ny andro sy ny alina tsy voahavako intsony<br /> Nangalarinao any ho'aho ny foko sy ny saiko ka ataoko akory?<br /> <br /> Kanefa tsy ahoako, tsy ahoako ô, tsy ahoako,<br /> Vao mainka ary ho ataoko, ho ataoko ô, ho ataoko ô.<br /> Tena mitapy aminao izy f'aza jerena fotsiny eo ô!<br /> To'dia amboary ny valizy fa rahariva izy haka anao eo ô!<br /> Raha ny vavan'ny mpanakivy hono tsy hahasakana anazy eo ô!<br /> F'ianao ilay tena izy, Jesôsy aza maka anareo ô.<br /> <br /> (Ameza!)<br /> <br /> Dia hozy ianao hoe izany ve dia marina sa 'zah mihitsy no beau parleur?<br /> Sa tianao hotabatabaiko amin'ny micro sy ny haut-parleur?<br /> Aza omena tsiny zah raha toa mi-rouler 'rrrr' fa tena rarakivy e.<br /> Sasa-miandry anao foana mijerijery lera, maraina atoandro hariva e.<br /> <br />"
  });

  for (let i = 0; i < 3; i++) {
    await Lyric.create({
      artistId: Rojo.id,
      title: "Chanson Rojo",
      content: "Aza omena tsiny raha toa mi-decl' be zah' fa tena te hitory<br /> Iray volana katroka ilay nahalalako anao izay no tsy nahita tory<br /> Mivadibadik'ondana ny andro sy ny alina tsy voahavako intsony<br /> Nangalarinao any ho'aho ny foko sy ny saiko ka ataoko akory?<br /> <br /> Kanefa tsy ahoako, tsy ahoako ô, tsy ahoako,<br /> Vao mainka ary ho ataoko, ho ataoko ô, ho ataoko ô.<br /> Tena mitapy aminao izy f'aza jerena fotsiny eo ô!<br /> To'dia amboary ny valizy fa rahariva izy haka anao eo ô!<br /> Raha ny vavan'ny mpanakivy hono tsy hahasakana anazy eo ô!<br /> F'ianao ilay tena izy, Jesôsy aza maka anareo ô.<br /> <br /> (Ameza!)<br /> <br /> Dia hozy ianao hoe izany ve dia marina sa 'zah mihitsy no beau parleur?<br /> Sa tianao hotabatabaiko amin'ny micro sy ny haut-parleur?<br /> Aza omena tsiny zah raha toa mi-rouler 'rrrr' fa tena rarakivy e.<br /> Sasa-miandry anao foana mijerijery lera, maraina atoandro hariva e.<br /> <br />"
    });
  }

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
