import React, { Component } from 'react';
import api from '../../../../services/api';

import Dashboard from '../../../../components/Dashboard';
import './styles.css';

export default class editBook extends Component {

  state = {
    allBooks: [],
    index: 0,
  }

  async loadBooks() {
    const response = await api.get('/api/Livros').catch(function (error) {
      console.log('Error: ' + error.message);
    });
    if (response != null) {
      console.log(response);
      this.setState({allBooks: response.data});
    }
  }

  async deleteBook(ID_Livro = 0) {
    const response = await api.delete(`/api/Livros/${ID_Livro}`).catch(function(error) {
      console.log('Error: ' + error.message);
    });
    if (response != null) {
      alert('Livro apagado com sucesso');
    }
  }

  handleDeleteBook = (ID_Livro = 0, index = 0) => {
    let confirmDelete = window.confirm(`Deseja realmente deletar o livro ${this.state.allBooks[index].Titulo} ${this.state.allBooks[index].SubTitulo}?`);
    if (confirmDelete) this.deleteBook(ID_Livro);
    else return;
  }

  componentDidMount() {
    this.loadBooks();
  }

  render() {
    return (
        <div className="selectBook-wrapper">
          <Dashboard />
          <div className="selectBook-container">

            <h1>Selecione o livro a ser deletado</h1>

            <ul>
              {this.state.allBooks.map((book, index) => (
                <li key={book.ID_Livro}>
                  <button onClick={() => this.handleDeleteBook(book.ID_Livro, index)}>
                    <img src={book.Imagem_URL} alt={book.Titulo}/>
                    <h2>{book.Titulo} {book.SubTitulo}</h2>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
    );
  }
}
