import React from "react";

export default function CardPokemon({id,pokemon}) {

    return (
        <>
        <div>
          <img className="imagen-pokemon" id={`imagen-pokemon${id}`} src={pokemon.image} alt={pokemon.name} />
          <p id={`nombre-pokemon${id}`} >{pokemon.name}</p>
          <progress id={`vida-pokemon${id}`} value={pokemon.hp} max={pokemon.maxHp}></progress>
          <label for={`vida-pokemon${id}`} id={`label-hp${id}` }>{pokemon.hp} / {pokemon.maxHp}</label>
        </div>
        
        
        </>
    )
}