require('dotenv').config();
const { YOUR_API_KEY } = process.env;
const { Dogs, Temperaments } = require("../db");
const axios = require("axios"); 
const { Op } = require("sequelize");


const imperialAkilo = (pesoString) => {
    const numeros = pesoString.split(/ - | – /).map(Number);
  
    if (numeros.length === 1) {
      // Si solo hay un número, lo convertimos y redondeamos
      const kg = Math.round(numeros[0] / 2.2046);
      return `${kg}`;
    } else if (numeros.length === 2) {
      // Si hay dos números, los convertimos y redondeamos
      const kg1 = Math.round(numeros[0] / 2.2046);
      const kg2 = Math.round(numeros[1] / 2.2046);
      return `${kg1} - ${kg2}`;
    }
  };

const cleanArray = (arr) => {
    const clean = arr.map(elem=>{
        let pesoFinalElem = imperialAkilo(elem.weight.imperial);
        return {
            id: elem.id,
            imagen: elem.image.url,
            nombre: elem.name,
            // altura: elem.height.metric,
            temperamento: elem.temperament,
            // años_de_vida: elem.life_span,
            peso: pesoFinalElem,
            // creado_DB: false
        };
    });
    return clean;
};

const cleanArrayDB = (arr) => {
    const clean = arr.map(elem=>{
        return {
            id: elem.id,
            imagen: elem.imagen,
            nombre: elem.nombre,
            // altura: elem.altura,
            temperamento: elem.temperamento,
            // años_de_vida: años_de_vida,
            peso: `${elem.pesoMin} - ${elem.pesoMax}`,
            // creado_DB: false
        };
    });
    return clean;
};



const cleanArrayByNameApi = (arr) => {
    const clean = arr.map(elem=>{
        let años_de_vida = elem.life_span.replace(" years", "");
        let pesoFinalElem = imperialAkilo(elem.weight.imperial);
        return {
            id: elem.id,
            imagen: elem.image.url,
            nombre: elem.name,
            altura: elem.height.metric,
            peso: pesoFinalElem,
            temperamento: elem.temperament,
            años_de_vida: años_de_vida,
            creado_DB: false
        };
    });
    return clean;
};



const getAllDogs = async () => {
    const dataBaseDogs1 = await Dogs.findAll()
    const dataBaseDogs = cleanArrayDB(dataBaseDogs1);
    const apiDogsRaw = (await axios.get(`https://api.thedogapi.com/v1/breeds/?api_key=${YOUR_API_KEY}`)).data
    const apiDogs = cleanArray(apiDogsRaw);
    const results = [...dataBaseDogs,...apiDogs];
    return results;
};



const getDogsByName = async (name) => {
    const lowerCaseName = name.toLowerCase();
    const dataBaseDogsName = await Dogs.findAll({ where: { nombre:  { [Op.iLike]: `%${lowerCaseName}%` } } });
    const apiDogs = (await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${YOUR_API_KEY}`)).data
    if (dataBaseDogsName.length === 0 && apiDogs.length === 0) {
        throw new Error("No se encontraron perros con el nombre ingresado");
    }
    const results = cleanArrayByNameApi(apiDogs).concat(dataBaseDogsName.map(dog => ({
        id: dog.id,
        imagen: dog.imagen,
        nombre: dog.nombre,
        altura: `${dog.alturaMin} - ${dog.alturaMax}`, 
        peso: `${dog.pesoMin} - ${dog.pesoMax}`,
        temperamento: dog.temperamento,
        años_de_vida: `${dog.años_de_vidaMin} - ${dog.años_de_vidaMax}`,
        creado_DB: true
    })));
    return results;
};



const getDogsById = async (id, source) => {
    const dog = source === "API" ?
    (await axios.get(`https://api.thedogapi.com/v1/breeds/${id}?api_key=${YOUR_API_KEY}`)).data :
    await Dogs.findByPk(id);
    return dog;
};

const findOrCreateTemperaments = async (temperamentsList) => {
    const existingTemperaments = await Temperaments.findAll({
        where: { nombre: temperamentsList }
    });
    const existingTemperamentNames = existingTemperaments.map(temperament => temperament.nombre);
    const newTemperaments = temperamentsList.filter(temperamento => !existingTemperamentNames.includes(temperamento));
    const createdTemperaments = await Temperaments.bulkCreate(newTemperaments.map(nombre => ({ nombre })));
    return [...existingTemperaments, ...createdTemperaments];
};

const createDogs = async (imagen, nombre, alturaMin, alturaMax, pesoMin, pesoMax, años_de_vidaMin, años_de_vidaMax, temperamento) => {

        const newDog = await Dogs.create({ imagen, nombre, alturaMin, alturaMax, pesoMin, pesoMax, años_de_vidaMin, años_de_vidaMax, temperamento });
        const temperamentsList = temperamento.split(', ');
        const existingTemperaments = await findOrCreateTemperaments(temperamentsList);
        await newDog.setTemperaments(existingTemperaments);
        return newDog;
 };





module.exports = { 
    getDogsById,
    createDogs,
    getAllDogs,
    getDogsByName
}