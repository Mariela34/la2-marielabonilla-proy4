import React from 'react';

export const DropdownPokemon = (props) => (
  <div className="form-group">
    <strong>Escoja su Pokemon: </strong>
    <select
      className="form-control"
      name={props.name}
      id={props.id}
      onChange={props.onChange}
    >
      <option defaultValue>Seleccione {props.name}</option>
      {props.options.map((item, index) => (
        <option key={index} value={item.url}>
          {item.name}
        </option>
      ))}
    </select>
  </div>
)



export default class DropdownList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.id,
      name: props.name,
      collection: [],
      value: '',
    }
  }
  componentDidMount() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
      .then((response) => response.json())
      .then((res) => this.setState({ collection: res.results }))
  }
  onChange = (event) => {
    this.setState({ value: event.target.value })
  }
  render() {
    return (
      <div className="fila">
        <DropdownPokemon
          id={this.state.id}
          name={this.state.name}
          options={this.state.collection}
          onChange={this.onChange}
        />
      </div>
    )
  }
}

