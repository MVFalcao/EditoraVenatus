import React, { Component } from 'react';
import api from '../../../../services/api';

import './styles.css';
import Dashboard from '../../../../components/Dashboard';
import Camera from '../../../../assets/administrator/camera.svg';

export default class addBook extends Component {

  constructor(props) {
    super(props)
    this.state = {
      Titulo: "",
      SubTitulo: "",
      Numero_Paginas: 1,
      Categoria: "",
      Descricao: "",
      Idioma: "",
      Classificacao_Indicativa: "",
      ISBN: "",
      Ilustrador: "",
      Imagem_URL: null,
      Datapublicacao: "",
      Preco: 1.00,
      Formato: "",
      Sinopse: "",
      ID_Autor: 0,
  
      Book: [],
      allAuthors: [],
    }
    this.handlePreview = this.handlePreview.bind(this);
  }
  
  handlePreview(event) {
    this.setState({Imagem_URL: URL.createObjectURL(event.target.files[0])});
  }
  
  async loadBook() {
    const response = await api.get(`/api/Livros/${this.props.match.params.id}`).catch(function(error) {
      console.log('Erro: ' + error.message);
    });
    if (response != null) {
      console.log(response);
      this.setState({Book: response.data})
      this.loadBookData();
    }
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
    
  loadBookData() {
    this.setState({Titulo: this.state.Book.Titulo});
    this.setState({SubTitulo: this.state.Book.SubTitulo});
    this.setState({Numero_Paginas: this.state.Book.Numero_Paginas});
    this.setState({Categoria: this.state.Book.Categoria});
    this.setState({Idioma: this.state.Book.Idioma});
    this.setState({Classificacao_Indicativa: this.state.Book.Classificacao_Indicativa});
    this.setState({ISBN: this.state.Book.ISBN});
    this.setState({Ilustrador: this.state.Book.Ilustrador});
    // this.setState({Datapublicacao: this.state.Book.Datapublicacao});
    this.setState({Formato: this.state.Book.Formato});
    this.setState({Preco: this.state.Book.Preco});
    this.setState({Sinopse: this.state.Book.Sinopse});
    this.setState({ID_Autor: this.state.Book.ID_Autor});
  }

  componentDidMount() {
    this.loadBook();
    this.loadAuthors();
  }

  handleSubmit = async event => {
    event.preventDefault();
    // const dataPublicaoSplit = this.state.Datapublicacao.split("-");
    // const dp = dataPublicaoSplit[1] + "/" + dataPublicaoSplit[2] + "/" + dataPublicaoSplit[0];

    await api.put('api/Livros', {
      "Titulo": this.state.Titulo,
      "SubTitulo": this.state.SubTitulo,
      "Numero_Paginas": this.state.Numero_Paginas,
      "Categoria": this.state.Categoria,
      "Descricao": " ",
      "Idioma": this.state.Idioma,
      "Classificacao_Indicativa": this.state.Classificacao_Indicativa,
      "ISBN": this.state.ISBN,
      "Ilustrador": this.state.Ilustrador,
      "Imagem_URL": " "/*this.state.Imagem_URL*/,
      "Datapublicacao": this.state.Datapublicacao,
      "Preco": this.state.Preco,
      "Formato": this.state.Formato,
      "Sinopse": this.state.Sinopse,
      "ID_Autor": this.state.ID_Autor,
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

            <h1>Edição de Livro</h1>

            <div className="addBook-data">
          
              <form onSubmit={this.handleSubmit}>
                <ul className="section item-1">

                  <li>
                    <label htmlFor="titulo">Titulo <span>*</span></label>
                    <input 
                      type="text" 
                      id="titulo"
                      required
                      value={this.state.Titulo} 
                      onChange={e => this.setState({Titulo: e.target.value})}
                      onFocus={e => e.target.select()}
                    />

                    <label htmlFor="subtitulo">SubTitulo <span>*</span></label>
                    <input 
                      type="text" 
                      id="subtitulo"
                      required
                      value={this.state.SubTitulo} 
                      onChange={e => this.setState({SubTitulo: e.target.value})}
                      onFocus={e => e.target.select()}
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
                      onFocus={e => e.target.select()}
                    />
                    {/* {console.log(this.state.Datapublicacao)} */}
                  </li>

                  <li>
                    <label htmlFor="ISBN">ISBN <span>*</span></label>
                    <input 
                      type="text" 
                      id="ISBN"
                      required
                      value={this.state.ISBN} 
                      onChange={e => this.setState({ISBN: e.target.value})}
                      onFocus={e => e.target.select()}
                    />

                    <label htmlFor="idioma">Idioma <span>*</span></label>
                    <input 
                      type="text" 
                      id="idioma"
                      required
                      value={this.state.Idioma} 
                      onChange={e => this.setState({Idioma: e.target.value})}
                      onFocus={e => e.target.select()}
                    />

                    <label htmlFor="ilustrador">Ilustrador <span>*</span></label>
                    <input 
                      type="text" 
                      id="ilustrador"
                      required
                      value={this.state.Ilustrador} 
                      onChange={e => this.setState({Ilustrador: e.target.value})}
                      onFocus={e => e.target.select()}
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
                      onFocus={e => e.target.select()}
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
                      onFocus={e => e.target.select()}
                    />

                    <label htmlFor="categoria">Categoria <span>*</span></label>
                    <input 
                      type="text" 
                      id="categoria"
                      required
                      value={this.state.Categoria} 
                      onChange={e => this.setState({Categoria: e.target.value})}
                      onFocus={e => e.target.select()}
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
                      onFocus={e => e.target.select()}
                    />
                  </li>

                </ul>

                <ul className="section item-2">

                  <li>
                    <label htmlFor="sinopse">Sinopse <span>*</span></label>
                    <textarea 
                      id="sinopse" 
                      cols="30" 
                      rows="10" 
                      required
                      value={this.state.Sinopse} 
                      onChange={e => this.setState({Sinopse: e.target.value})}>
                      onFocus={e => e.target.select()}
                    </textarea>
                  </li>

                  <li id="imagem-container">
                    <label id="label-imagem" htmlFor="imagemURL">Imagem do Livro <span>*</span></label>
                    <label id="imagem-livro" htmlFor="imagemURL" className={this.state.Imagem_URL ? 'has-image' : ''} style={{ backgroundImage: `url(${this.state.Imagem_URL})`}}>
                      <input 
                        type="file" 
                        id="imagemURL"
                        required
                        accept=".png, .jpg, .jpeg"
                        onChange={this.handlePreview}
                      />
                      {/* {console.log(this.state.Imagem_URL)} */}
                      <img src={Camera} alt="IconeDeCamera"/>
                    </label>
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
