const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("genre", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  });
  sequelize
    .authenticate()
    .then(() => console.log("CONECTADO A LA BASE DE DATOS DE GENRES"))
    .catch((error) => console.log("ERROR DE CONEXIÓN: " + error));
};
