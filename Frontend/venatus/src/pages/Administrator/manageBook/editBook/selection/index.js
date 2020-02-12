import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../../../services/api';

import Dashboard from '../../../../../components/Dashboard';
import './styles.css';

export default class editBook extends Component {

  state = {
    allBooks: [],
  }

  async loadBooks() {
    const response = await api.get('/api/Livros').catch(function (error) {
      console.log(error);
    });
    if (response != null) {
      console.log(response);
      this.setState({allBooks: response.data});
    }
  }

  componentDidMount() {
    this.loadBooks();
  }

  render() {
    return (
        <div className="selectBook-wrapper">
          <Dashboard />
          <div className="selectBook-container">

            <h1>Selecione o livro a ser editado</h1>

            <ul>
              {this.state.allBooks.map(book => (
                <li key={book.ID_Livro}>
                  <Link to={`/administrator/editbook/${book.ID_Livro}`}>
                    <img src={book.Imagem_URL} alt={book.Titulo}/>
                    <h2>{book.Titulo} {book.SubTitulo}</h2>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
    );
  }
}
