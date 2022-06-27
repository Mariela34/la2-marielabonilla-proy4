import React from "react";
import '../App.css';

export default function SelectedPokemon({className, pokemonesSeleccionados}) {
    return (
        <button className={className} onClick={pokemonesSeleccionados}>Seleccionar</button> 
    )
}