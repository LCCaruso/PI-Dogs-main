const { Router } = require("express");
const { getDogsHandler, getDogsByIdHandler, createDogsHandler } = require("../handlers/dogsHandlers");

const dogsRouter = Router();

dogsRouter.get("/", getDogsHandler);
dogsRouter.get("/:id", getDogsByIdHandler);
dogsRouter.post("/", createDogsHandler);


module.exports = dogsRouter;