const { getTemperaments, createTemperaments } = require("../controllers/temperamentsController");
const { Temperaments } = require("../db");

const getTemperamentsHandler = async (req, res) => {
    try {
        const temperaments = await getTemperaments();
        res.status(200).json(temperaments);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};


const createTemperamentsHandler = async (req, res) => {
    const { nombre } = req.body;
    try {
        const newTemperament = await createTemperaments(nombre);
        res.status(200).json(newTemperament);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};



module.exports = { 
    getTemperamentsHandler,
    createTemperamentsHandler
}