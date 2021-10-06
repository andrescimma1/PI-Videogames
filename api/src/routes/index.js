const { Router } = require("express");
const axios = require("axios");
const { response } = require("../app");
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

Promise.all([page1, page2, page3, page4, page5]).then(function (contents) {
  contents.forEach((element) => {
    data.push(element.data.results);
  });
});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/videogames", (req, res) => {
  const { name } = req.query;
  let found = [];
  let counter = 0;

  if (name) {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 20; j++) {
        if (data[i][j].name.toLowerCase().includes(name.toLowerCase())) {
          found.push(data[i][j].name);
          counter++;
          if (counter === 15) break;
        }
      }
      if (counter === 15) break;
    }

    if (found.length > 0) {
      res.json(found);
    } else
      res.json({ error: `No se encontrar videojuegos con el nombre: ${name}` });
  }

  res.json(data);
});

router.get("/games/:id", (req, res) => {
  const { id } = req.params;

  axios
    .get(
      `https://api.rawg.io/api/games/${id}?key=3d9923605ce94d72b0cc3cc69bfae2ab`
    )
    .then((response) => res.json(response.data));
});

router.get("/genres", (req, res) => {
  axios
    .get("https://api.rawg.io/api/genres?key=3d9923605ce94d72b0cc3cc69bfae2ab")
    .then((response) => res.json(response.data));
});

module.exports = router;
