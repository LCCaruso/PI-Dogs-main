const { Dogs } = require("../db");

const createDogs = async (imagen, nombre, altura, peso, años_de_vida) => {
    const newDog = await Dogs.create({imagen, nombre, altura, peso, años_de_vida})
    return newDog;
};

module.exports = { createDogs }