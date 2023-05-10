import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css"


export default function LandingPage() {

	return (
		<div class="background-l">
			<div class="flex-item-l title-l" >
				<h2>POKEDEX 🐲</h2>
				<Link to="/home" >
					<button type="submit" className="btn-landing-l">Ir a la página ➡</button>
				</Link>
			</div>
			<div className="flex-item-l info-l">
				<h2>¡Bienvenidos a nuestra página de Pokémons!</h2>
				<p>Aquí encontrarás todo lo que necesitas saber sobre tus Pokémons favoritos y mucho más. Desde noticias y reseñas hasta trucos y consejos, nuestra página es el lugar ideal para los entrenadores de Pokémons.</p>
				<p>¿Quieres conocer los últimos lanzamientos? ¿O tal vez estás buscando información sobre un Pokémon en particular? ¡No te preocupes! En nuestra página encontrarás una amplia variedad de información sobre los Pokémons más populares del momento, así como los clásicos de todas las generaciones.</p>
			</div>
		</div>

	);
}


