import React, { Component, useState } from "react";



export default function Attacks({id, punch, pokemon, pokemon1, pokemon2}) {
    const [attacks, setAttacks] = useState('')
    const [receptorDano, setReceptorDano] = useState('')
    let num = 0;
    


    useEffect(() => {

        if (prevProps.pokemon1 !== this.props.pokemon1) {



            try {

                const movesPokemon = [];
                for (let i = 0; i < 4; i++) {
                    const indice = Math.floor(Math.random() * this.props.pokemon1.moves.length);
                    movesPokemon.push(this.props.pokemon1.moves[indice]);
                }

                const promesas = movesPokemon.map((ataque) => {
                    return fetch(ataque.move.url);
                });

                const respuestas = await Promise.all(promesas);

                const ataques = await Promise.all(
                    respuestas.map(function (respuesta) {
                        return respuesta.json();
                    })
                )
                this.setState({ attacks: ataques })


                if (this.props.pokemon.name === this.props.pokemon1.name) {
                    this.setState({ receptorDano: this.props.pokemon2 })

                } else {
                    //setReceptorDano("pokemon1")
                    this.setState({ receptorDano: pokemon1 })
                   

                }
            } catch (err) {
                console.error(err);
            }
           
        }
    },[attacks])

    

  
    return (
        <>
            <div id={`ataques-${this.state.id}`} key={`ataques-${this.state.id}`}>
                {
                    this.state.attacks.map(
                        (ataque) => {
                            this.i = this.i + 1
                            //return <ButtonAttack keyAttack={`${ataque.id}-${this.state.id}-${i}`} ataque={ataque.name} power={ataque.power} receptorDano={this.state.receptorDano} />

                                return <button key={`${ataque.id}-${ this.i }-${ this.i }`} className="boton-ataque" onClick={(e) => {
                                this.state.punch(ataque.power
                                    , receptorDano, pokemon1)
                                }}
                                type="button">{ataque.name}</button>
                        }
                    )
                }
            </div>
        </>
    )
}

