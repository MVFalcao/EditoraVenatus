import React, { Component } from 'react';
import api from '../../../../services/api';

import './styles.css';
import Dashboard from '../../../../components/Dashboard';
// import book from '../../../book';

export default class addBook extends Component {

  state = {
    Titulo: "",
    SubTitulo: "",
    Numero_Paginas: 1,
    Categoria: "",
    Descricao: "",
    Idioma: "",
    Classificacao_Indicativa: "",
    ISBN: "",
    Ilustrador: "",
    Imagem_URL: "",
    Datapublicacao: "",
    Preco: 1.00,
    Formato: "",
    Sinopse: "",
    ID_Autor: 0,

    allAuthors: []
  }

  async loadAuthors() {
    const response = await api.get(`api/Autors`).catch(function(error) {
        console.log('Algo deu errado: ' + error.message);   
    });
    if (response != null) {
        console.log(response);
        this.setState({allAuthors: response.data})
    }
  }

  componentDidMount() {
    this.loadAuthors();
  }


  render() {
    return (
      <div className="addBook-wrapper">
          <Dashboard />

          <div className="addBook-container">

            <h1>Cadastro de Livro</h1>

            <div className="addBook-data">
          
              <form>
              <ul className="section item-1">

                <li>
                  <label htmlFor="titulo">Titulo <span>*</span></label>
                  <input 
                    type="text" 
                    id="titulo"
                    required
                    value={this.state.Titulo} 
                    onChange={e => this.setState({Titulo: e.target.value})}
                  />

                  <label htmlFor="subtitulo">SubTitulo <span>*</span></label>
                  <input 
                    type="text" 
                    id="subtitulo"
                    required
                    value={this.state.SubTitulo} 
                    onChange={e => this.setState({SubTitulo: e.target.value})}
                  />

                  <label>Autor <span>*</span></label>
                  <select id="author-select" value={this.state.ID_Autor} onChange={e => this.setState({ID_Autor: e.target.value})}>
                    {this.state.allAuthors.map(author => (
                      <option key={author.ID_Autor} value={author.ID_Autor}>{author.Nome}</option>
                      ))}
                  </select>

                  <label htmlFor="dataPublicacao">Data de Publicação <span>*</span></label>
                  <input 
                    type="date" 
                    id="dataPublicacao"
                    required
                    value={this.state.Datapublicacao} 
                    onChange={e => this.setState({Datapublicacao: e.target.value})}
                  />

                </li>

                <li>
                  <label htmlFor="ISBN">ISBN <span>*</span></label>
                  <input 
                    type="text" 
                    id="ISBN"
                    required
                    value={this.state.ISBN} 
                    onChange={e => this.setState({ISBN: e.target.value})}
                  />

                  <label htmlFor="idioma">Idioma <span>*</span></label>
                  <input 
                    type="text" 
                    id="idioma"
                    required
                    value={this.state.Idioma} 
                    onChange={e => this.setState({Idioma: e.target.value})}
                  />

                  <label htmlFor="ilustrador">Ilustrador <span>*</span></label>
                  <input 
                    type="text" 
                    id="ilustrador"
                    required
                    value={this.state.Ilustrador} 
                    onChange={e => this.setState({Ilustrador: e.target.value})}
                  />

                  <label htmlFor="preco">Preço <span>*</span></label>
                  <input 
                    type="number"
                    id="preco"
                    step=".01"
                    min="1"
                    required
                    value={this.state.Preco} 
                    onChange={e => this.setState({Preco: e.target.value})}
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

                  <label htmlFor="categoria">Categoria <span>*</span></label>
                  <input 
                    type="text" 
                    id="categoria"
                    required
                    value={this.state.Categoria} 
                    onChange={e => this.setState({Categoria: e.target.value})}
                  />

                  <label>Classificação Indicativa <span>*</span></label>
                  <select value={this.state.Classificacao_Indicativa} onChange={e => this.setState({Classificacao_Indicativa: e.target.value})}>
                    <option value="L">Livre</option>
                    <option value="10">Maiores de 10 anos</option>
                    <option value="12">Maiores de 12 anos</option>
                    <option value="14">Maiores de 14 anos</option>
                    <option value="16">Maiores de 16 anos</option>
                    <option value="18">Maiores de 18 anos</option>
                    {/* {console.log(this.state.Classificacao_Indicativa)} */}
                  </select>

                  <label htmlFor="numeroPaginas">Número de Páginas <span>*</span></label>
                  <input 
                    type="number"
                    id="numeroPaginas"
                    min="1"
                    required
                    value={this.state.Numero_Paginas} 
                    onChange={e => this.setState({Numero_Paginas: e.target.value})}
                  />
                </li>

              </ul>

                <ul className="section item-2">

                  <li>
                    <label htmlFor="sinopse">Sinopse <span>*</span></label>
                    <textarea id="sinopse" cols="30" rows="10" value={this.state.Sinopse} onChange={e => this.setState({Sinopse: e.target.value})}>

                    </textarea>
                  </li>

                  <li>
                    <label htmlFor="imagemURL">Imagem do Livro <span>*</span></label>
                    <input 
                      type="file" 
                      id="imagemURL"
                      required
                      value={this.state.Imagem_URL} 
                      onChange={e => this.setState({Imagem_URL: e.target.value})}
                    />
                  </li>

                </ul>
              </form>
            </div>
          </div>
      </div>
    );
  }
}
