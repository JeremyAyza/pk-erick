import React from "react";
import Card from "../Card/Card";
import "./Pokemons.css"

export default function Pokemons ({pokemons}) {

	

  return (
    <div className="showing">
      {pokemons.length > 0 ?
      pokemons.map((data) => (<Card key={data.id} data={data} />))
      :<div className="t-w">BUSCANDO ...</div>
			
      }
    </div>
  );
};

