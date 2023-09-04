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
            // altura: elem.height.metric,
            temperamento: elem.temperament,
            // años_de_vida: elem.life_span,
            peso: elem.weight.metric,
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
            peso: elem.peso,
            // creado_DB: false
        };
    });
    return clean;
};

const cleanArrayByNameApi = (arr) => {
    const clean = arr.map(elem=>{
        return {
            id: elem.id,
            imagen: elem.image.url,
            nombre: elem.name,
            altura: elem.height.metric,
            peso: elem.weight.metric,
            temperamento: elem.temperament,
            años_de_vida: elem.life_span,
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
        altura: dog.altura,
        peso: dog.peso,
        temperamento: dog.temperamento,
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


const createDogs = async (imagen, nombre, altura, peso, años_de_vida, temperamento) => {
    try {
        if (!nombre) throw new Error("Ingrese el Nombre");
        if (!altura) throw new Error("Ingrese la Altura");
        if (!peso) throw new Error("Ingrese el Peso");
        if (!años_de_vida) throw new Error("Ingrese Años de Vida");
        if (!temperamento) throw new Error("Ingrese al menos 1 Temperamento");
        
        const newDog = await Dogs.create({ imagen, nombre, altura, peso, años_de_vida, temperamento });
        const temperamentsList = temperamento.split(', ');
        const existingTemperaments = await findOrCreateTemperaments(temperamentsList);
        await newDog.setTemperaments(existingTemperaments);
        return newDog;
    } catch (error) {
        throw new Error(`${error.message}`);
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