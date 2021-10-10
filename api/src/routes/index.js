const { Router } = require("express");
const axios = require("axios");
const { response } = require("../app");
const { Videogame, Genre } = require("../db");
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

axios
  .get("https://api.rawg.io/api/genres?key=3d9923605ce94d72b0cc3cc69bfae2ab")
  .then(
    (response) =>
      (genres = response.data.results.map((genre) => {
        Genre.create(
          {
            id: genre.id,
            name: genre.name,
          },
          {
            include: "videogames",
          }
        );
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

  const gamesDB = await Videogame.findAll({
    include: {
      model: Genre,
    },
  });
  gamesDB.map((element) => {
    data.push({
      id: element.dataValues.id,
      name: element.dataValues.name,
      background_image: element.dataValues.background_image,
      description: element.dataValues.description,
      released: element.dataValues.released,
      rating: element.dataValues.rating,
      genres: element.dataValues.genres,
      platforms: element.dataValues.platforms,
      db: true,
    });
  });

  res.json(data);
});

router.get("/videogame/:id", (req, res) => {
  const { id } = req.params;

  let gameFounded;
  data.map((game) => {
    if (game.id.toString() === id) gameFounded = game;
  });

  if (!gameFounded.hasOwnProperty("db")) {
    axios
      .get(
        `https://api.rawg.io/api/games/${id}?key=3d9923605ce94d72b0cc3cc69bfae2ab`
      )
      .then((response) => res.json(response.data));
  } else {
    res.json(gameFounded);
  }
});

router.get("/genres", async (req, res) => {
  const db = await Genre.findAll({
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
  console.log(platforms);

  let platformsString = "";

  platforms.map(
    (platform) => (platformsString = platformsString + platform + " | ")
  );

  let id = -1;
  let founded;

  do {
    id++;
    founded = false;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        founded = true;
        break;
      }
    }
  } while (founded);

  if (name && description && platforms) {
    videogame = await Videogame.create(
      {
        id: id,
        name: name,
        background_image: background_image,
        description: description,
        released: released,
        rating: rating,
        platforms: platformsString,
      },
      {
        include: "genres",
      }
    );

    const genresDBfounded = await Genre.findAll({
      where: { [Op.or]: { name: genres } },
    });

    videogame.addGenres(genresDBfounded);

    res.send(req.body);
  }
});

module.exports = router;
