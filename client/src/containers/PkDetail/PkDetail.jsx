import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonById } from "../../actions/index";
import NotFound from "../../components/NotFound/NotFound";
import "./PkDetail.css";

function PkDetail({ id }) {
  const dispatch = useDispatch();
  const pokemon = useSelector((store) => store.searchPokemonById);
	
  useEffect(() => {
    dispatch(getPokemonById(id));
		console.log({ pokemon });
  }, []);
	
	useEffect(() => {
		console.log({ pokemon });
	}, [dispatch]);
  return (    
		<div className="detail">
			<div className="info">
				<div className="image">
					{pokemon.image === null || !pokemon.image ? (
						<NotFound image={"noimage"} />
					) : (
						<img src={pokemon.image} alt={pokemon.name} />
					)}
					<div>
						<h1>{pokemon.name} </h1>
					</div>
				</div>
				<div className="details">
					
					<div className="info-box">
						<div className="info-item">
							<div className="value">ID:{pokemon.id}</div>
						</div>
						<div className="info-item">
							<div className="value">{"Types: "}
							<br />
							{pokemon?.types?.join(", ") }</div>
						</div>
						<div className="info-item">
							<div className="value">Ataque:
							<br />
							 {pokemon.ataque}</div>
						</div>
						<div className="info-item">
							<div className="value">Defensa:
								<br />
								{pokemon.defensa}</div>
						</div>
						<div className="info-item">
							<div className="value">Velocidad:
								<br />
								{pokemon.velocidad}</div>
						</div>
						<div className="info-item">
							<div className="value">Altura:
								<br />
								{pokemon.altura}</div>
						</div>
						<div className="info-item">
							<div className="value">Peso:
								<br />
								{pokemon.peso}</div>
						</div>
					</div>
				</div>
			</div>
			<Link to="/home">
				<button className="button" type="submit">🡸</button>
			</Link>
		</div>
  
  );
}

export default PkDetail;