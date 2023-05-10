import React from "react";
import "./Pagination.css";

export const Pagination = ({ pokemonsPerPage, totalPokemons, paginate }) => {
	const totalPages = Math.ceil(totalPokemons / pokemonsPerPage);

	return (
		<nav className="pagination">
			{Array.from({ length: totalPages }, (_, pageNumber) => (
				<div key={pageNumber} className="item">
					<button className="p-item" onClick={(e) => paginate(e, pageNumber + 1)}>
						{pageNumber + 1}
					</button>
				</div>
			))}
		</nav>
	);
};
