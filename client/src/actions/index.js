export function getPokemons() {
  return function (dispatch) {
    return fetch(`http://localhost:3001/pokemon`)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "GET_POKEMONS", payload: json });
      });
  };
}

export function searchPokemons(name) {
  return (dispatch) =>
    fetch(`http://localhost:3001/pokemon?name=${name}`)
      .then((resp) => resp.json())
      .then((json) => {
        dispatch({
          type: "SEARCH_POKEMONS",
          payload: json,
        });
      });
}

export function getPokemonById(id) {
  return (dispatch) =>
    fetch(`http://localhost:3001/pokemon/${id}`)
      .then((resp) => resp.json())
      .then((json) => {
        dispatch({
          type: "GET_POKEMON_BY_ID",
          payload: json,
        });
      });
}

export function getTypes() {
  return (dispatch) =>
    fetch(`http://localhost:3001/types`)
      .then((resp) => resp.json())
      .then((json) => {
        dispatch({
          type: "GET_TYPES",
          payload: json,
        });
      });
}

export function createPokemon(obj) {
	console.log({obj});
  return (dispatch) =>
    fetch("http://localhost:3001/pokemon", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((resp) => resp.json())
      .then((json) => {
        dispatch({
          type: "CREATE_POKEMON",
          payload: json,
        });
      });
}

export const resetAll = () => {
  return (dispatch) => {
    dispatch({
      type: "RESET",
    });
  };
};


export const filterByType = (types) => (dispatch, getState) => {
  let filteredPokemons = [];

  if (types === "All") {
    filteredPokemons = getState().pokemons || [];

  } else {
		filteredPokemons = getState().pokemons.filter((pk) =>
      (pk.types).includes(types)
    )
  };
  dispatch({
    type: "FILTER_BY_TYPE",
    payload: {
      types,
			pokemonType: filteredPokemons,
    },
  });
};


export const orderAsc = (type) => (dispatch, getState) => {
	const filtered = getState().filteredPokemons;

	let pokemonsOrder = [];

	if (type === "asc_name") {
		pokemonsOrder = filtered.sort((a, b) => a.name.localeCompare(b.name));
	} else if (type === "asc_ataque") {
		pokemonsOrder = filtered.sort((a, b) => a.ataque - b.ataque);
	}

	dispatch({
		type: "ORDER_ASC_ATAQUE",
		payload: {
			pokemonsOrder,
			name: type,
		},
	});
};



export const orderDesc = (type) => async (dispatch, getState) => {
	const filtered = getState().filteredPokemons;
	let pokemonsOrder = [];

	if (type === "desc_name") {
		pokemonsOrder = filtered.sort((a, b) => b.name.localeCompare(a.name));
	} else if (type === "desc_ataque") {
		pokemonsOrder = filtered.sort((a, b) => b.ataque - a.ataque);
	}

	dispatch({
		type: "ORDER_DESC_ATAQUE",
		payload: {
			pokemonsOrder,
			name: type,
		},
	});
};


export const orderByCreator = (source) => (dispatch, getState) => {
  const pokemons = getState().pokemons.filter(function (G) {
      return G.source === source
    });
  dispatch({
    type: "ORDER_BY_CREATOR",
    payload: {
      pokemons,
      source,
    },
  });
};