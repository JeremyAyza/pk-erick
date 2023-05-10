const { Router } = require("express");
const { getAllTypes } = require("../controllers/type.controller");
const { getAllPokemons, getPokemonsById, createPokemon } = require("../controllers/pokemon.controller");

const routerApp = Router();

routerApp.get("/types", getAllTypes);
routerApp.get("/pokemon", getAllPokemons);
routerApp.get("/pokemon/:id", getPokemonsById);
routerApp.post("/pokemon", createPokemon);

module.exports = routerApp;