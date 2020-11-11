import './App.css';
import React, { Component } from 'react';
import './grafico.js';
import { Link } from 'react-router-dom'
import api from './api';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      valores: [],
    }
    this.state = {
      ano: " "
    }
    this.state = {
      valor: " "
    }
  }

  async componentDidMount() {
    const responde = await api.get('');

    this.setState({ valores: responde.data });
  }

  selecionarAno = e => {
    this.setState({ ano: e.target.value })
  }

  selecionarValor = e => {
    this.setState({ valor: e.target.value })
  }

  rentabilidade(ano, valor) {

    if (ano === "1ano") {
      let tesouro = "/grafico/" + ano + "/" + valor;
      return tesouro
    } else {
      let tesouro = "/grafico/" + ano + "/" + valor;
      return tesouro
    }
  }

  render() {

    const { valores } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1>Veja aqui qual seria sua rentabilidade entre Bitcoin e Tesouro Direto pré-fixado!</h1>
          {console.log(valores)}
          <form>

            <label forname="sel2">Selecione uma das duas opções abaixo:</label>
            <select className="form-control" value={this.state.ano} onChange={this.selecionarAno}>
              <option value="null"></option>
              <option value="1ano">1 ano atrás</option>
              <option value="2anos">2 anos atrás</option>
            </select>
            <br></br>

            <label forname="sel1">Selecione umas das duas opções de valores:</label>
            <select className="form-control" value={this.state.valor} onChange={this.selecionarValor}>
              <option value="null"></option>
              <option value="2mil"> R$2 mil</option>
              <option value="10mil">R$10 mil</option>
            </select>
            <br></br>

            <Link to={this.rentabilidade(this.state.ano, this.state.valor)}><button type="button" className="btn btn-primary btn-lg">Consultar rentabilidade</button></Link>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
