const { Router } = require("express");
const { getDogsHandler, getDogsByIdHandler, createDogsHandler } = require("../handlers/dogsHandlers");

const dogsRouter = Router();

dogsRouter.get("/", getDogsHandler);
dogsRouter.get("/:id", getDogsByIdHandler); //peticion por id
dogsRouter.post("/", createDogsHandler);


module.exports = dogsRouter;