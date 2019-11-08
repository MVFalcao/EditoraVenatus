import React, { Component } from 'react';
import api from '../../../../services/api';

import './styles.css';
import Dashboard from '../../../../components/Dashboard';

export default class addBook extends Component {

    state = {
      Nome: "",
      CNPJ: "",
      //Ilustrador: "",
    }

  handleSubmit = async event => {
    event.preventDefault();
    // const dataPublicaoSplit = this.state.Datapublicacao.split("-");
    // const dp = dataPublicaoSplit[1] + "/" + dataPublicaoSplit[2] + "/" + dataPublicaoSplit[0];

    await api.post('api/Livrarias', {
      "Nome": this.state.Nome,
      "CNPJ": this.state.CNPJ,
    }).catch(function (error) {
      console.log(error.response);
      console.log("Error: " + error.message);
    });
  }

  render() {
    return (
      <div className="addBook-wrapper">

          <Dashboard />

          <div className="addBook-container">

            <h1>Cadastro de Livraria</h1>

            <div className="addBook-data">
          
              <form onSubmit={this.handleSubmit}>
                <ul className="section item-1">

                  <li>
                    <label htmlFor="nome">Nome <span>*</span></label>
                    <input 
                      type="text" 
                      id="nome"
                      required
                      value={this.state.Titulo} 
                      onChange={e => this.setState({Titulo: e.target.value})}
                    />

                    {/* <label>Autor <span>*</span></label>
                    <select id="author-select" value={this.state.ID_Autor} onChange={e => this.setState({ID_Autor: e.target.value})}>
                      {this.state.allAuthors.map(author => (
                        <option key={author.ID_Autor} value={author.ID_Autor}>{author.Nome}</option>
                        ))}
                    </select> */}
                  </li>

                  <li>
                    <label htmlFor="CNPJ">CNPJ <span>*</span></label>
                    <input 
                      type="text" 
                      id="CNPJ"
                      required
                      value={this.state.ISBN} 
                      onChange={e => this.setState({ISBN: e.target.value})}
                    />
                  </li>

                  <li>
                    <label htmlFor="dimensoes">Dimensões <span>*</span></label>
                    <input 
                      type="text"
                      id="dimensoes"
                      required
                      value={this.state.Formato} 
                      onChange={e => this.setState({Formato: e.target.value})}
                    />

                    {/* <label>Classificação Indicativa <span>*</span></label>
                    <select value={this.state.Classificacao_Indicativa} onChange={e => this.setState({Classificacao_Indicativa: e.target.value})}>
                      <option value="L">Livre</option>
                      <option value="10">Maiores de 10 anos</option>
                      <option value="12">Maiores de 12 anos</option>
                      <option value="14">Maiores de 14 anos</option>
                      <option value="16">Maiores de 16 anos</option>
                      <option value="18">Maiores de 18 anos</option>
                      {console.log(this.state.Classificacao_Indicativa)}
                    </select> */}
                  </li>

                </ul>

                <button type="submit">Cadastrar</button>

              </form>
            </div>
          </div>
      </div>
    );
  }
}
