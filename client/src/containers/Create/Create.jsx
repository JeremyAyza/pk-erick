import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPokemon, getTypes } from "../../actions/index";
import "./Create.css";

export default function Create() {
	const dispatch = useDispatch();
	const types = useSelector((store) => store.types);
	const types1 = types.slice(0, 10)
	const types2 = types.slice(10, 20)

	const [pk, setPk] = useState({
		name: "",
		image: "",
		ataque: 0,
		vida: 0,
		defensa: 0,
		velocidad: 0,
		altura: 0,
		peso: 0,
		types: [],
		
	});

	useEffect(() => {
		dispatch(getTypes());
	}, []); // eslint-disable-line react-hooks/exhaustive-deps



	const handleChange = (e) => {
		if (e.target.name === "types") {
			let arr = [...pk.types];
			if (arr.length >= 2) {
				if (!arr.includes(e.target.value)) {
					alert("Solo se pueden elegir dos tipos.");
					return;
				}
			}
			if (!arr.includes(e.target.value)) {
				arr.push(e.target.value);
			} else {
				arr = arr.filter((type) => type !== e.target.value);
			}
			setPk({
				...pk,
				types: arr,
			});
		} else {
			setPk({
				...pk,
				[e.target.name]: e.target.value,
			});
		}
	};
	



	const handleSubmit = (e) => {
		e.preventDefault();

		const obj = {
			name: pk.name,
			image: pk.image || "https://cdn.pixabay.com/photo/2020/07/21/16/10/pokemon-5426712_640.png",
			vida: pk.vida,
			ataque: pk.ataque,
			types: pk.types,
			velocidad: pk.velocidad,
			defensa: pk.defensa,
			altura: pk.altura,
			peso: pk.peso,
			types: pk.types,


		};
		

		// Validaciones
		if (!obj.name) {
			alert("Por favor, ingresa un nombre.");
			return;
		}
		if ( obj.ataque <= 0) {
			alert("El ataque debe ser mayor a 0.");
			return;
		}
		if (obj.vida <= 0) {
			alert("La vida debe ser mayor a 0.");
			return;
		}
		if (obj.defensa <= 0) {
			alert("La defensa debe ser mayor a 0.");
			return;
		}
		if (obj.velocidad <= 0) {
			alert("La velocidad debe ser mayor a 0.");
			return;
		}
		if (obj.altura <= 0) {
			alert("La altura debe ser mayor a 0.");
			return;
		}
		if (obj.peso <= 0) {
			alert("El peso debe ser mayor a 0.");
			return;
		}
		if (!obj.types || obj.types.length < 2) {
			alert("Selecciona al menos dos tipos.");
			return;
		}
		if (obj.types.length > 2) {
			alert("Solo se pueden elegir dos tipos.");
			return;
		}


		dispatch(createPokemon(obj));
		e.target.reset();
		alert("Pokemon creado exitosamente");
		/* dispatch(getPokemons()) */

		setPk({
			name: "",
			image: "",
			ataque: 0,
			vida: 0,
			defensa: 0,
			velocidad: 0,
			altura: 0,
			peso: 0,
			types: [],
		});
	};

	return (
		<div className="container">
			<h1>Registra un Pokemon</h1>
			<form
				id="survey-form"
				className="form"
				noValidate
				onChange={(e) => handleChange(e)}
				onSubmit={(e) => handleSubmit(e)}
			>
				<div>
					<div>
						<div className="divTitles">
							<div className="imagediv">
								<label>Nombre</label>
								<input
									className="label"
									type="text"
									name="name"
									value={pk.name}
								></input>
							</div>
							<div className="imagediv">
								<label>Ataque:</label>
								<input
									className="label"
									type="number"
									name="ataque"
									value={pk.ataque}
								></input>
							</div>
							<div className="imagediv">
								<label>Vida:</label>
								<input
									className="label"
									type="number"
									name="vida"
									value={pk.vida}
								></input>
							</div>
							<div className="imagediv">
								<label>Defensa:</label>
								<input
									className="label"
									type="number"
									name="defensa"
									value={pk.defensa}
								></input>
							</div>
							<div className="imagediv">
								<label>Velocidad:</label>
								<input
									className="label"
									type="number"
									name="velocidad"
									value={pk.velocidad}
								></input>
							</div>
							<div className="imagediv">
								<label>Peso:</label>
								<input
									className="label"
									type="number"
									name="peso"
									value={pk.peso}
								></input>
							</div>
							<div className="imagediv">
								<label>Altura:</label>
								<input
									className="label"
									type="number"
									name="altura"
									value={pk.altura}
								></input>
							</div>



							<div className="imagediv">
								<label>URL de la Imagen:</label>
								<input
									className="label"
									type="text"
									name="image"
									value={pk.image}
								></input>
							</div>
						</div>
						
					</div>
					<div className="checkboxs">
						<div className="checks">
							<label>Tipos:</label>
							<div className="gendivs">
								<div>
									{types1.map((gen,index) => (
										<div key={index} className="c-item">
											<input
												type="checkbox"
												name="types"
												value={gen.name}
											></input>
											<label name={gen}>{gen.name}</label>
										</div>
									))}
								</div>
								<div>
									{types2.map((gen) => (
										<div key={gen.name} className="c-item"> 
											<input
												type="checkbox"
												name="types"
												value={gen.name}
											></input>
											<label name={gen}>{gen.name}</label>
										</div>
									))}
								</div>
							</div>
						</div>
						

					</div>
					<button className="button" type="submit">
						Registrar
					</button>
				</div>
			</form>
		</div>
	);
}

