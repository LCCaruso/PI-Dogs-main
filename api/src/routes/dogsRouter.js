const { Router } = require("express");
const { getDogsHandler, getDogsByIdHandler, createDogsHandler } = require("../handlers/dogsHandlers");

const dogsRouter = Router();

// const validate = (nombre, altura, peso, años_de_vida, temperamento) => {
//         if (!nombre) throw new Error("Ingrese el Nombre");
//         if (!altura) throw new Error("Ingrese la Altura");
//         if (!peso) throw new Error("Ingrese el Peso");
//         if (!años_de_vida) throw new Error("Ingrese Años de Vida");
//         if (!temperamento) throw new Error("Ingrese al menos 1 Temperamento"); 
// };    

dogsRouter.get("/", getDogsHandler);
dogsRouter.get("/:id", getDogsByIdHandler);
dogsRouter.post("/", createDogsHandler); //quitado validate, createDogsHandler


module.exports = dogsRouter;