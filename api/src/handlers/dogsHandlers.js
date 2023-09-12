const { createDogs, getDogsById, getDogsByName, getAllDogs } = require("../controllers/dogsControllers");
require('dotenv').config();
const { URL_BASE } = process.env;

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
            let años_de_vida = dog.life_span.replace(" years", "");
            let pesoFinal = imperialAkilo(dog.weight.imperial);
            results.imagen = `${URL_BASE}${dog.reference_image_id}.jpg`;
            results.nombre = dog.name;
            results.altura = dog.height ? dog.height.metric : null;
            results.peso = pesoFinal;   //let en linea 48 para ejecutar la funcion q convierte a kilo
            results.temperamento = dog.temperament
            results.años_de_vida = años_de_vida; //let hecha para quitar el "years", linea 31
        }
        res.status(200).json(results);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const createDogsHandler = async (req, res) => {
    const { imagen, nombre, alturaMin, alturaMax, pesoMin, pesoMax, años_de_vidaMin, años_de_vidaMax, temperamento } = req.body;
    try {
        
        if (!nombre) throw new Error("Ingrese el Nombre");
        if (!alturaMin) throw new Error("Ingrese la Altura Minima");
        if (!alturaMax) throw new Error("Ingrese la Altura Maxima");
        if (!pesoMin) throw new Error("Ingrese el Peso Minimo");
        if (!pesoMax) throw new Error("Ingrese el Peso Maximo");
        if (!años_de_vidaMin) throw new Error("Ingrese Años de Vida Minimo");
        if (!años_de_vidaMax) throw new Error("Ingrese Años de Vida Maximo");
        if (!temperamento) throw new Error("Ingrese al menos 1 Temperamento");

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