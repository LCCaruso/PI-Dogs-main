const { Router } = require("express");
const { getTemperamentsHandler, createTemperamentsHandler } = require ("../handlers/temperamentsHandlers");

const temperamentsRouter = Router();

temperamentsRouter.get("/", getTemperamentsHandler);
temperamentsRouter.post("/", createTemperamentsHandler);

module.exports = temperamentsRouter;