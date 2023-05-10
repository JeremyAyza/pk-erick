import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTypes, filterByType, orderByCreator, orderAsc, orderDesc } from "../../actions/index";
import "./Filter.css";

export function Filter({ paginate }) {
	const dispatch = useDispatch()
	const types = useSelector((store) => store.types);

	useEffect(() => {
		dispatch(getTypes());
	}, []); // eslint-disable-line react-hooks/exhaustive-deps


	// Filtrado por type
	const handleFilter = (e) => {
		dispatch(filterByType(e.target.value))
		paginate(e, 1);
	};


	// Ordenado
	const handleOrder = (e) => {
		if (e.target.value === "asc_name" || e.target.value === "asc_ataque") {
			dispatch(orderAsc(e.target.value));
		} else if (e.target.value === "desc_name" || e.target.value === "desc_ataque") {
			dispatch(orderDesc(e.target.value));
		} else {
			dispatch(filterByType(e.target.value));
		}
	};

	// Filtrado por API/DB
	const handleCreator = (e) => {
		if (e.target.value === "Api" || e.target.value === "Created") {
			dispatch(orderByCreator(e.target.value));
			paginate(e, 1);
			console.log("BUSCANDO POR CREADOR");
		}
		else {
			console.log({ creador: e.target.value });
			dispatch(filterByType(e.target.value));
			paginate(e, 1);
		}

	};

	return (
		<div className="filter">
			<div>
				<label htmlFor="type-filter">Genero: </label>
				<select id="type-filter" onChange={(e) => handleFilter(e)}>
					<option value="All">Todos</option>
					{types.map((type) => (
						<option key={type.id} value={type.name}>{type.name}</option>
					))}
				</select>
			</div>
			<div>
				<label htmlFor="order-filter">Orden: </label>
				<select id="order-filter" onChange={(e) => handleOrder(e)}>
					<option value="All">Todos</option>
					<option value="asc_name">(A-Z)</option>
					<option value="desc_name">(Z-A)</option>
					<option value="asc_ataque">Ataque Acendente</option>
					<option value="desc_ataque">Ataque Descendente</option>
				</select>
			</div>
			<div>
				<label htmlFor="creator-filter">Creador :</label>
				<select id="creator-filter" onChange={(e) => handleCreator(e)}>
					<option value="All">Todos</option>
					<option value="Api">Api Pokemons</option>
					<option value="Created">User pokemons</option>
				</select>
			</div>


		</div>

	);
}

export default Filter;