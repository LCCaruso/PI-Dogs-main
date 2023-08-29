const { createDogs } = require("../controllers/dogsControllers");

const getDogsHandler = (req, res) => {
    const {name} = req.query;
    if(name !== undefined) {
        res.send(`Perro enontrado: ${name}`)
    }else{
        res.send("Informacion de todos los Perros")
    }    
};

const getDogsByIdHandler = (req, res) => {
    const {id} = req.params; //obtengo el valor del parametro :id
    res.status(200).send(`Esta ruta obtiene el detalle de una raza específica ${id}`);
};


const createDogsHandler = async (req, res) => {
    try {
    const {imagen, nombre, altura, peso, años_de_vida} = req.body;
    const newDog = await createDogs(imagen, nombre, altura, peso, años_de_vida);
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