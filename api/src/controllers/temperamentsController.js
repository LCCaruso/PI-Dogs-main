const { Temperaments } = require('../db')
const axios = require('axios')
require('dotenv').config();
const { YOUR_API_KEY } = process.env;



const getTemperaments = async () => {
    const temperamentsDb = await Temperaments.findAll();

    if (temperamentsDb.length) {
        return temperamentsDb;
    } else {
        const apiTemperaments = await axios.get(`https://api.thedogapi.com/v1/breeds/?api_key=${YOUR_API_KEY}`);
        const dogList = apiTemperaments.data;

        const listaTemperamentos = dogList.map((dog) => {
            if (!dog.temperament) {
                return undefined;
            }
            const aux = dog.temperament.split(", ");
            return aux;
        });

        const limparValoresUndefined = listaTemperamentos.flat().filter(Boolean);
        const valoresUnicos = new Set(limparValoresUndefined);
        const resultadoFinal = [...valoresUnicos];

        await Promise.all(
            resultadoFinal.map((dog) =>
                Temperaments.findOrCreate({
                    where: {
                        nombre: dog,
                    },
                })
            )
        );

        return await Temperaments.findAll();
    }
};



const createTemperaments = async (nombre) => {
    try {
        const newTemperament = await Temperaments.create({ nombre });
        return newTemperament;
    } catch (error) {
        throw new Error(`Error creating temperament: ${error.message}`);
    }
};



module.exports = {
    getTemperaments,
    createTemperaments
};