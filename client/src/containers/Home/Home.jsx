import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, resetAll } from "../../actions/index";
import Pokemons from "../../components/Pokemons/Pokemons";
import { Pagination } from "../../components/Pagination/Pagination";
import { Filter } from "../Filter/Filter";
import Search from "../Search/Search";

export default function Home() {
	const dispatch = useDispatch();


	useEffect(() => {
		dispatch(resetAll());
		dispatch(getPokemons());

	}, []); // eslint-disable-line react-hooks/exhaustive-deps


	const filteredPokemons = useSelector((state) => state.filteredPokemons);

	const filterBy = useSelector((state) => state.filterBy);
	const orderBy = useSelector((state) => state.orderBy);
	const pokemons = useSelector((state) => state.pokemons);
	console.log(pokemons[0]);

	// Filtrado y Ordenado
	let allPokemons;

	allPokemons = filterBy === "All" && orderBy === "Select"
		?
		pokemons
		:
		filteredPokemons

	//let allPokemons
	//if ((filterBy === "All" && orderBy === "Select") || filteredPokemons.length === 0) {
	//	allPokemons = pokemons
	//} else {
	//	allPokemons = filteredPokemons
	//}

	// Paginacion
	function paginate(e, num) {
		e.preventDefault();
		setPage(num);
	}

	const [page, setPage] = useState(1);
	const [pokemonsPerPage] = useState(10);

	let lastCardPerPage = page * pokemonsPerPage;
	let firtsCardPerPage = lastCardPerPage - pokemonsPerPage;
	console.log({ allPokemons });
	let currentPageGames = allPokemons.slice(firtsCardPerPage, lastCardPerPage);





	return (
		<div className="home">
			<Filter paginate={paginate} />
			<Search />

			<Pokemons pokemons={currentPageGames} />
			<Pagination
				pokemonsPerPage={pokemonsPerPage}
				totalPokemons={allPokemons.length}
				paginate={paginate}
			/>
		</div>
	);
};