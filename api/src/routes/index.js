const { Router } = require("express");
const axios = require("axios");
const { response } = require("../app");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", (req, res) => {
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
    let data = [];

    contents.forEach((element) => {
      data.push(element.data.results);
    });
    res.json(data);
  });
});

router.get("/games/:id", (req, res) => {
  const { id } = req.params;

  axios
    .get(
      `https://api.rawg.io/api/games/${id}?key=3d9923605ce94d72b0cc3cc69bfae2ab`
    )
    .then((response) => res.json(response.data));
});

module.exports = router;
