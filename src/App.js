import React, { useState, useEffect } from "react";
import './App.css';
import { Fragment } from 'react';
import DropdownList from './Components/DropdownPokemon';
import CardPokemon from './Components/CardPokemon';
import SelectedPokemon from './Components/SelectedPokemons';
import Attacks from "./Components/Attacks";
import { useCallback } from "react";

function App() {
    const [pokemon1, setPokemon1] = useState("");
    const [pokemon2, setPokemon2] = useState("");

    async function fetchPokemon(url) {
        try {
            const respuesta = await fetch(url)
                .then((res) => res.json())
                .then((data) => { return data });
            return respuesta;
        } catch (error) {
            console.error(error);
        }
    }




    const cargarPokemones = async () => {
        const select1 = document.getElementById("pokemon1");
        const select2 = document.getElementById("pokemon2");

        // const opcionesDelSelect = select1.options;
        // const indiceSeleccionado = select1.selectedIndex;

        const pokemonSeleccionado1 = select1.options[select1.selectedIndex].value;
        const pokemonSeleccionado2 = select2.options[select2.selectedIndex].value;

        let poke1 = await fetchPokemon(pokemonSeleccionado1);

        poke1.hp = poke1.stats[0].base_stat;
        poke1.image = poke1.sprites.back_default;
        poke1.maxHp = poke1.stats[0].base_stat;

        let poke2 = await fetchPokemon(pokemonSeleccionado2);
        poke2.hp = poke2.stats[0].base_stat;
        poke2.image = poke2.sprites.front_default;
        poke2.maxHp = poke2.stats[0].base_stat;

        setPokemon1(poke1)
        setPokemon2(poke2)

    }

    

    const aplicarDano = useCallback( async (dano, pokemon, pokemon1prev) => {
        
        pokemon.hp = pokemon.hp - dano;
        if (pokemon.hp < 0) {
            pokemon.hp = 0;
        }

        if (pokemon.name === pokemon1prev.name) {
            const imagenPokemon1 = document.getElementById("imagen-pokemon1");
            imagenPokemon1.classList.toggle("dano");
            setTimeout(() => {
                imagenPokemon1.classList.toggle("dano");
                if (pokemon.hp === 0) {
                    imagenPokemon1.classList.toggle("muerto");
                }
            }, 501);

            setPokemon1(pokemon,"poke1")
            console.log(pokemon)


        } else {
            const imagenPokemon2 = document.getElementById("imagen-pokemon2");
            imagenPokemon2.classList.toggle("dano");
            setTimeout(() => {
                imagenPokemon2.classList.toggle("dano");
                if (pokemon.hp === 0) {
                    imagenPokemon2.classList.toggle("muerto");
                }
            }, 501);
            // setPokemon2(pokemon)
            setPokemon2(pokemon)
            console.log(pokemon)

        }
        
    })

  

    useEffect(() => {
        console.log(pokemon1);

    }, [pokemon1]);

    useEffect(() => {
        console.log(pokemon2);

    }, [pokemon2]);



    return (
        <Fragment>
            <div className="App">
                <header className="App-header">
                </header>
                <div className="form">
                    <div className="fila">
                        <DropdownList id="pokemon1" name="pokemon1" />
                        <DropdownList id="pokemon2" name="pokemon2" />
                    </div>
                    <SelectedPokemon className="boton-seleccionar" pokemonesSeleccionados={cargarPokemones} />
                </div>
            </div>
            <div className="contenedor-batalla">
                <CardPokemon pokemon={pokemon1} id="1" />
                <Attacks pokemon={pokemon1}  pokemon1={pokemon1} pokemon2={pokemon2} id="1" punch={aplicarDano} />

                <CardPokemon pokemon={pokemon2} id="2" />
                <Attacks  pokemon={pokemon2} pokemon1={pokemon1} pokemon2={pokemon2} id="2" punch={aplicarDano} />


            </div>
        </Fragment>
    );
}

export default App;