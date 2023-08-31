require('dotenv').config();
const { YOUR_API_KEY } = process.env;
const { Dogs, Temperaments } = require("../db");
const axios = require("axios"); 
const { Op } = require("sequelize");


const cleanArray = (arr) => {
    const clean = arr.map(elem=>{
        return {
            id: elem.id,
            imagen: elem.image.url,
            nombre: elem.name,
            altura: elem.height.metric,
            peso: elem.weight.metric,
            años_de_vida: elem.life_span,
            temperamento: elem.temperament,
            creado_DB: false
        };
    });
    return clean;
};


const getAllDogs = async () => {
    const dataBaseDogs = await Dogs.findAll()
    const apiDogsRaw = (await axios.get(`https://api.thedogapi.com/v1/breeds/?api_key=${YOUR_API_KEY}`)).data
    const apiDogs = cleanArray(apiDogsRaw);
    const results = [...dataBaseDogs,...apiDogs];
    return results;
};



const getDogsByName = async (name) => {
    const lowerCaseName = name.toLowerCase();
    const dataBaseDogsName = await Dogs.findAll({ where: { nombre:  { [Op.iLike]: `%${lowerCaseName}%` } } });
    const apiDogs = (await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${YOUR_API_KEY}`)).data
    const results = cleanArray(apiDogs).concat(dataBaseDogsName.map(dog => ({
        id: dog.id,
        imagen: dog.imagen,
        nombre: dog.nombre,
        altura: dog.altura,
        peso: dog.peso,
        años_de_vida: dog.años_de_vida,
        temperamento: dog.temperamento,
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


const createDogs = async (imagen, nombre, altura, peso, años_de_vida, temperamento) => {
    try {
        if (!temperamento || temperamento.length === 0) {
            throw new Error("Debe proporcionar al menos un temperamento");
        }
        const newDog = await Dogs.create({ imagen, nombre, altura, peso, años_de_vida, temperamento });
        const temperamentsList = temperamento.split(', ');
        const existingTemperaments = await findOrCreateTemperaments(temperamentsList);
        await newDog.setTemperaments(existingTemperaments);
        return newDog;
    } catch (error) {
        throw new Error(`Error al crear el perro: ${error.message}`);
    }
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



module.exports = { 
    getDogsById,
    createDogs,
    getAllDogs,
    getDogsByName
}