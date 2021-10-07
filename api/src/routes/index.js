const { Router } = require("express");
const axios = require("axios");
const { response } = require("../app");
const { Videogame, Genres } = require("../db");
const { Op } = require("sequelize");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

let data = [];

const page1 = axios.get(
  "https://api.rawg.io/api/games?key=3d9923605ce94d72b0cc3cc69bfae2ab"
);
const page2 = axios.get(
  "https://api.rawg.io/api/games?key=3d9923605ce94d72b0cc3cc69bfae2ab&page=2"
);
const page3 = axios.get(
  "https://api.rawg.io/api/games?key=3d9923605ce94d72b0cc3cc69bfae2ab&page=3"
);
const page4 = axios.get(
  "https://api.rawg.io/api/games?key=3d9923605ce94d72b0cc3cc69bfae2ab&page=4"
);
const page5 = axios.get(
  "https://api.rawg.io/api/games?key=3d9923605ce94d72b0cc3cc69bfae2ab&page=5"
);

let genres;
let gamesBoolean = false;

axios
  .get("https://api.rawg.io/api/genres?key=3d9923605ce94d72b0cc3cc69bfae2ab")
  .then(
    (response) =>
      (genres = response.data.results.map((genre) => {
        Genres.create({
          id: genre.id,
          name: genre.name,
        });
      }))
  );

Promise.all([page1, page2, page3, page4, page5]).then(function (contents) {
  contents.forEach((element) => {
    for (let i = 0; i < 20; i++) {
      data.push({
        id: element.data.results[i].id,
        name: element.data.results[i].name,
        description: element.data.results[i].description,
        released: element.data.results[i].released,
        rating: element.data.results[i].rating,
        genres: element.data.results[i].genres,
        platforms: element.data.results[i].platforms,
        background_image: element.data.results[i].background_image,
      });
    }
  });
});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/videogames", async (req, res) => {
  const { name } = req.query;
  let found = [];
  let counter = 0;

  if (name) {
    data.map((game) => {
      if (
        game.name.toLowerCase().includes(name.toLowerCase()) &&
        counter < 15
      ) {
        found.push(game.name);
        counter++;
      }
    });

    if (found.length > 0) {
      res.json(found);
    } else
      res.json({
        error: `No se encontraron videojuegos con el nombre: ${name}`,
      });
  }

  // if (!gamesBoolean) {
  //   data.map(async (data) => {
  //     let platforms = "";
  //     data.platforms.map((platform) => (platforms += platform.name + " "));
  //     let game = Videogame.create({
  //       id: data.id,
  //       name: data.name,
  //       background_image: data.background_image,
  //       description: "data.description",
  //       released: data.released,
  //       rating: data.rating,
  //       platforms: platforms,
  //     });

  //     let genre = Genres.findAll({
  //       where: { name: { [Op.or]: data.genres }, include: [Videogame] },
  //     });

  //     if (genre) {
  //       await game.addGenres(genre);
  //     }
  //   });

  //   gamesBoolean = true;
  // } else {
  //   const gamesDB = await Videogame.findAll({
  //     include: {
  //       model: Genres,
  //     },
  //   });
  //   res.json(gamesDB);
  // }

  const gamesDB = await Videogame.findAll();
  gamesDB.map((element) => {
    data.push({
      id: element.dataValues.id,
      name: element.dataValues.name,
      background_image: element.dataValues.background_image,
      description: element.dataValues.description,
      released: element.dataValues.released,
      rating: element.dataValues.rating,
      genres: [{ name: "Action" }],
      platforms: element.dataValues.platforms,
    });
  });

  res.json(data);
});

router.get("/videogame/:id", (req, res) => {
  const { id } = req.params;

  axios
    .get(
      `https://api.rawg.io/api/games/${id}?key=3d9923605ce94d72b0cc3cc69bfae2ab`
    )
    .then((response) => res.json(response.data));
});

router.get("/genres", async (req, res) => {
  const db = await Genres.findAll({
    include: {
      model: Videogame,
    },
  });

  res.json(db);
});

router.post("/videogame", async (req, res) => {
  const {
    name,
    background_image,
    description,
    genres,
    released,
    rating,
    platforms,
  } = req.body;

  let videogame;

  if (name && description && released && rating && platforms) {
    videogame = await Videogame.create({
      id: 400000,
      name: name,
      background_image: background_image,
      description: description,
      released: released,
      rating: rating,
      platforms: platforms,
    });
  }

  const hola = await Genres.findOne({ where: { name: genres } });

  console.log(hola);

  await videogame.addGenres(hola);
  res.send(req.body);
});

module.exports = router;
