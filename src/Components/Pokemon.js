import React, { Component } from "react";

export default class Pokemon extends Component{

    constructor(props) {
        super(props)

    }

    render() {
        return (
            <>
                <div>
                    <img className="imagen-pokemon" id={`imagen-pokemon${this.props.id}`} src={this.props.image} alt={this.props.name} />
                    <p id={`nombre-pokemon${this.props.id}`} >{this.props.name}</p>
                    <progress id={`vida-pokemon${this.props.id}`} value={this.props.hp} max={this.props.maxHp}></progress>
                    <label for={`vida-pokemon${this.props.id}`} id={`label-hp${this.props.id}`}>{this.props.hp} / {this.props.maxHp}</label>
                </div>


            </>
        )
    }
}