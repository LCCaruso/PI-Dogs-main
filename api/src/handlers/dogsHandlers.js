const { createDogs, getDogsById, getDogsByName, getAllDogs } = require("../controllers/dogsControllers");
require('dotenv').config();
const { URL_BASE } = process.env;

const getDogsHandler = async (req, res) => {
    const { name } = req.query;
    try{
        const results = name ? await getDogsByName(name) : await getAllDogs();
        res.status(200).json(results);
    }catch (error) {
        res.status(400).json({error: error.message})
    }
};

const getDogsByIdHandler = async (req, res) => {
    const { id } = req.params;
    const source = isNaN(id) ? "DB" : "API";
    try {
        const dog = await getDogsById(id, source);
        const results = {
            id: dog.id,
            imagen: dog.imagen,
            nombre: dog.nombre,
            altura: `${dog.alturaMin} - ${dog.alturaMax}`,
            peso: `${dog.pesoMin} - ${dog.pesoMax}`,
            años_de_vida: `${dog.años_de_vidaMin} - ${dog.años_de_vidaMax}`,
            temperamento: dog.temperamento,
            creado_DB: source === "DB"
        };
        if (source === "API") {
            results.imagen = `${URL_BASE}${dog.reference_image_id}.jpg`;
            results.nombre = dog.name;
            results.altura = dog.height ? dog.height.metric : null;
            results.peso = dog.weight ? dog.weight.metric : null;
            results.temperamento = dog.temperament
            results.años_de_vida = dog.life_span;
        }
        res.status(200).json(results);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const createDogsHandler = async (req, res) => {
    const { imagen, nombre, alturaMin, alturaMax, pesoMin, pesoMax, años_de_vidaMin, años_de_vidaMax, temperamento } = req.body;
    try {
    const newDog = await createDogs(imagen, nombre, alturaMin, alturaMax, pesoMin, pesoMax, años_de_vidaMin, años_de_vidaMax, temperamento);
    res.status(201).json(newDog)
    } catch (error) {
    res.status(400).json({error: error.message})
    }
};




module.exports = {
    getDogsHandler,
    getDogsByIdHandler,
    createDogsHandler
}