const { Type } = require('../db');
// GET all types

const axios = require("axios");
const {URL_API, API_KEY} = process.env;

// 1. Función para obtener todos los géneros de la base de datos
async function getAllTypes(req, res) {
	try {
		const typesDB = await Type.findAll();
		return res.json(typesDB);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Error retrieving types from database" });
	}
}

// 2. Función para poblar la base de datos con los géneros desde la API externa
// Se ejecutara al iniciar el servidor

async function populateTypesOnDB() {
	try {
		// 1. Se realiza una petición a la API externa para obtener los géneros
		const response = await axios.get(URL_API + `/type`);

		// 2. Obtenemos los nombres de los géneros desde la respuesta de la API y los convertimos en objetos con el formato requerido por la base de datos
		const types = response.data.results.map(type => ({ name: type.name }));

		// 3. Insertamos los géneros en la base de datos utilizando el método bulkCreate de Sequelize. 
		// Si un género ya existe en la base de datos, no se inserta.
		await Type.bulkCreate(types, { ignoreDuplicates: true });

		// 4. Imprimimos un mensaje en la consola para indicar que la operación ha terminado
		console.log("tipos repoblados en la base de datos.");
	} catch (error) {
		console.error(error);
	}

}



module.exports = {getAllTypes, populateTypesOnDB };
