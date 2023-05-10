require('dotenv').config();
const { Sequelize } = require('sequelize');
const pokemonEntity = require("./models/Pokemon");
const typeEntity = require("./models/Type");

const {
	DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
	host: DB_HOST,
	port: +DB_PORT,
	dialect: 'postgres',
	logging: false,
})

// Import models
const Pokemon = sequelize.define('pokemon', pokemonEntity, {timestamps: false});
const Type = sequelize.define('type', typeEntity, {timestamps: false})
// Relationships
Pokemon.belongsToMany(Type, { through: "pokemons_type", timestamps: false });
Type.belongsToMany(Pokemon, { through: "pokemons_type", timestamps: false });


module.exports = {
	Pokemon,
	Type,
	conn: sequelize,
};
