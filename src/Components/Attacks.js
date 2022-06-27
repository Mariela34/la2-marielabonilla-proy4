import React, { Component } from "react";


export const ButtonAttack = (props) => {

 <button key={props.keyAttack} className="boton-ataque" onClick={`aplicarDano(${props.power
        }, ${props.receptorDano})`}>{props.ataque}</button>
        
}


export default class Attacks extends Component {

    constructor(props) {
        super(props)

        this.state = {
            punch:props.punch,
            id: props.id,
            attacks: [],
            receptorDano: {}        
        }
    }


    async componentDidUpdate(prevProps, prevState) {

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
                    this.setState({ receptorDano: this.props.pokemon1 })
                   

                }
            } catch (err) {
                console.error(err);
            }
           
        }
    }

    
    render() {
        let i = 0;
        return (
            <>
                <div id={`ataques-${this.state.id}`} key={`ataques-${this.state.id}`}>
                    {
                        this.state.attacks.map(
                            (ataque) => {
                                i++;
                                //return <ButtonAttack keyAttack={`${ataque.id}-${this.state.id}-${i}`} ataque={ataque.name} power={ataque.power} receptorDano={this.state.receptorDano} />

                                 return <button key={`${ataque.id}-${this.state.id}-${i}`} className="boton-ataque" onClick={(e) => {
                                    this.state.punch(ataque.power
                                        , this.state.receptorDano, this.props.pokemon1)
                                 }}
                                 type="button">{ataque.name}</button>
                            }
                        )
                    }
                </div>
            </>
        )
    }
}

