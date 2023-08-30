require('dotenv').config();
const { YOUR_API_KEY } = process.env;
const { Dogs } = require("../db");
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
// , { attributes: ["imagen", "nombre", "altura", "peso", "años_de_vida"] }


const createDogs = async (imagen, nombre, altura, peso, años_de_vida) => {
    const newDog = await Dogs.create({imagen, nombre, altura, peso, años_de_vida})
    return newDog;
};



module.exports = { 
    getDogsById,
    createDogs,
    getAllDogs,
    getDogsByName
}