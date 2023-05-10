const axios = require("axios");
const { validate: isUuidV4 } = require('uuid');
const {Op} = require("sequelize")
const { Pokemon, Type } = require('../db.js');
const {  URL_API } = process.env;


function mapper(results) {
	return results.map(pk => {
		return {
			id: pk.id,
			name: pk.name,
			image: pk.sprites.front_default,
			vida: pk.stats[0].base_stat,
			ataque: pk.stats[1].base_stat,
			defensa: pk.stats[2].base_stat,
			velocidad: pk.stats[3].base_stat,
			altura: pk.height,
			peso: pk.weight,
			types: pk.types.map((t) => t.type.name), // los tipos estan en propiedad llamando name
			source: "Api"
		}
	});

}

const getFromApiByName = async (name) => {
	try {
		const response = await axios.get(URL_API + `pokemon/${name}`)
		const pokemonApi = response.data
		const pokemonMapeado = mapper([pokemonApi])
		return pokemonMapeado[0]
	} catch(error) {
		return []
	}

}

const getFromApi100 = async () => {
	const response = await axios.get(URL_API + `pokemon?limit=50&offset=0`)
	const promises = response.data.results.map(({ name },inx) => {
		return getFromApiByName(name)
	})
	const pokemons = await Promise.all(promises);	
	return pokemons

}



const getPokemonsFromDB = async (name) => {
	// Busca los pokemons en la base de datos y los incluye con los géneros a los que pertenecen
	try {
		const options = {
			include: {
				model: Type,
				attributes: ["name"],
				through: { attributes: [] }
			}
		};
		//si es por nombre que busque por nombre
		if (name) {
			const s_name=name.toLowerCase()
			options.where = { name: { [Op.eq]: s_name } };
		}
		const pokemonsInDb = await Pokemon.findAll(options)
		
		// Formatea los objetos de los videojuegos de la base de datos para incluir los géneros y la fuente de origen
		const pokemons = pokemonsInDb.map(({ dataValues }) => {
			return {
				...dataValues,
				types: dataValues.types?.map(type => type.name),
				source: "Created"
			}
		});

		return pokemons
	} catch(error) {
		console.error(error)
		return []
	}

}

async function getAllPokemons(req, res) {
	try {

		let pokemonsFromApi, pokemonsFromDB
		let allPokemons
		const name = req.query?.name
		console.log({name});
		if (name !=undefined){
			const s_name=name.toLowerCase()
			pokemonsFromApi = await getFromApiByName(s_name);
			pokemonsFromDB = await getPokemonsFromDB(s_name);
			allPokemons = pokemonsFromDB.concat([pokemonsFromApi])

			if (allPokemons.length > 1) {
				allPokemons = allPokemons.slice(0, 1);
			}
		}
		else{
			pokemonsFromApi = await getFromApi100();
			pokemonsFromDB = await getPokemonsFromDB();

			allPokemons = [...pokemonsFromDB, ...pokemonsFromApi];

		}
		// Retorna los videojuegos como respuesta HTTP
		res.json(allPokemons);
	} catch (error) {
		res.status(500).json({ error: 'Ocurrió un error al obtener los pokemones.' });
	}
}


async function getPokemonsById(req, res) {
	// Obtener el ID del parámetro de la solicitud
	const { id } = req.params;
	// Declarar la variable game para almacenar el videojuego
	try {
		// Si el ID es un UUID v4 válido
		if(isUuidV4(id)){
			// Buscar el videojuego en la base de datos
			const result = await Pokemon.findByPk(id,{
				include: {
				model: Type,
        attributes: ["name", "id"],
				through: { attributes: [] }
				},
			});
			// Si no se encontró el videojuego, devolver un mensaje de error 404
			if(!result) return res.status(404).json({statusCode: 404, message: "No existe el videojuego en la DB"});
			// Si se encontró el videojuego, obtener sus datos y agregar los nombres de los géneros al objeto game
			const data = result.dataValues;
			const pokemon = { ...data, types: data.types.map(type => type.name) }
			return res.json(pokemon);
		}
		// Si el ID no es un UUID v4 válido, buscar el videojuego en el API externo
		const pokemon = await getFromApiByName(id)
		//transformo el juego en un array para poder pasarlo por mapper
		//y extraigo el primer y unico elemento del array
		return res.json(pokemon);

	} catch (error) {
		// Si no se encontró el videojuego en la base de datos ni en el API, devolver un mensaje de error 404
		return res.status(404).json({statusCode: 404, message: "No existe el pokemon ni en la DB ni en el API"});
	}
	
}

async function createPokemon(req, res) {
  // Obtener los parámetros enviados en el cuerpo de la solicitud

	const { name, image, vida, ataque, defensa, velocidad, altura, peso, types }=req.body
	
  
	try {
  	// Verificar que el parámetro 'types' sea un array y tenga al menos un elemento
  	// y verificar que los id's enviados correspondan a las 19 categorias de los generos del api externa
		if (!types || !Array.isArray(types) || types.length === 0) {
			return res.status(400).json({ statusCode: 400, error: "Debe enviar mínimo un tipo (su id)" });
		}

		//genres es un array de strings		
		const typesPromises = types.map(name => Type.findOne({ where: { name } }));
		const typesArray = await Promise.all(typesPromises);
		//si hay generos invalidos manda error
		if (typesArray.some(result => !result)) return res.status(400).json({ statusCode: 400, error: "Error con los generos, algunas no exiten en la DB" })

    // Crear un nuevo registro de videojuego con los parámetros enviados
    const newPk = await Pokemon.create({
			name, image, vida, ataque, defensa, velocidad, altura, peso
    });
		//asociar sus generos al juego
		await newPk.addTypes(typesArray);

		// Si todo funciona correctamente, se devuelve un mensaje de éxito con el código de estado 200 y el ID del videojuego creado.
		res.json(`Pokemon creado con éxito! => Id ${newPk.id}`);

  } catch (error) {
    // Si ocurre un error al crear el videojuego, se maneja y se devuelve un mensaje de error
		console.error(error)
		return res.status(400).json({message:"No se pudo crear"})
  }

}

module.exports = {
	getPokemonsById,
	createPokemon,
	getAllPokemons,
	
};
