import React, { Component } from 'react';
import api from '../../../../services/api';

import './styles.css';
import Dashboard from '../../../../components/Dashboard';

export default class addBook extends Component {

    state = {
      Nome: "",
      CNPJ: "",
      TipoConsignacao: "",
  
      Bookstore: [],
    }
  
  handlePreview = (event) => {
    this.setState({Imagem_URL: URL.createObjectURL(event.target.files[0])});
  }
  
  async loadBookstore() {
    const response = await api.get(`/api/Livrarias/${this.props.match.params.id}`).catch(function(error) {
      console.log('Erro: ' + error.message);
    });
    if (response != null) {
      console.log(response);
      this.setState({Bookstore: response.data})
      this.loadBookstoreData();

    }
  }
    
  loadBookstoreData = () => {
    this.setState({Nome: this.state.Bookstore.Nome});
    this.setState({CNPJ: this.state.Bookstore.CNPJ});
    this.setState({TipoConsignacao: this.state.Bookstore.Tipo_Consignacao});
  }

  componentDidMount() {
    this.loadBookstore();
  }

  handleSubmit = async event => {
    event.preventDefault();
    // const dataPublicaoSplit = this.state.Datapublicacao.split("-");
    // const dp = dataPublicaoSplit[1] + "/" + dataPublicaoSplit[2] + "/" + dataPublicaoSplit[0];

    await api.put('api/Livros', {
      "Nome": this.state.Nome,
      "CNPJ": this.state.CNPJ,
      "Tipo_Consignacao": this.state.TipoConsignacao,
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

            <h1>Edição de Livraria</h1>

            <div className="addBook-data">
          
              <form onSubmit={this.handleSubmit}>
                <ul className="section item-1">

                  <li>
                    <label htmlFor="nome">Nome <span>*</span></label>
                    <input 
                      type="text" 
                      id="nome"
                      required
                      value={this.state.Nome} 
                      onChange={e => this.setState({Nome: e.target.value})}
                    />
                  </li>

                  <li>
                    <label htmlFor="CNPJ">CNPJ <span>*</span></label>
                    <input 
                      type="text" 
                      id="CNPJ"
                      required
                      value={this.state.CNPJ} 
                      onChange={e => this.setState({CNPJ: e.target.value})}
                    />
                  </li>

                  <li>
                    <label>Tipo Consignação <span>*</span></label>
                    <select value={this.state.TipoConsignacao} onChange={e => this.setState({TipoConsignacao: e.target.value})}>
                      <option value="Consignado">Consignado</option>
                      <option value="NaoConsignado">Não Consignado</option>
                    </select>
                  </li>

                </ul>

                <button type="submit">Atualizar</button>

              </form>
            </div>
          </div>
      </div>
    );
  }
}