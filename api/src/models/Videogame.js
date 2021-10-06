const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("videogame", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    released: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.STRING,
    },
    platforms: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  sequelize
    .authenticate()
    .then(() => console.log("CONECTADO A LA BASE DE DATOS"))
    .catch((error) => console.log("ERROR DE CONEXIÓN: " + error));
};
