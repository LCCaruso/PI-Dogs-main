const { DataTypes, UUID } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dogs', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alturaMin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alturaMax: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pesoMin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pesoMax: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    años_de_vidaMin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    años_de_vidaMax: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    temperamento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creado_DB: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { timestamps: false }
  );
};
