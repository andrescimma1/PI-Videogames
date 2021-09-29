const { Router } = require("express");
const { response } = require("../app");
const axios = require("axios");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", (req, res) => {
  axios
    .get(`https://api.rawg.io/api/games?key=3d9923605ce94d72b0cc3cc69bfae2ab`)
    .then((response) => res.json(response.data));
});

module.exports = router;
