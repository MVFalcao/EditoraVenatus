import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../../../services/api';

import Dashboard from '../../../../../components/Dashboard';

import './styles.css';
import BookstoreImg from '../../../../../assets/administrator/bookstoreImg.svg'

export default class editBook extends Component {

  state = {
    allBookstores: [],
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
 
            <h1>Selecione a Livraria a ser editada</h1>

            <ul>
              {this.state.allBookstores.map(bookstore => (
                <li key={bookstore.ID_Livraria}>
                  <Link to={`/editbookstore/${bookstore.ID_Livraria}`}>
                    <img src={BookstoreImg} alt={bookstore.Titulo}/>
                    <h2>{bookstore.Titulo} {bookstore.SubTitulo}</h2>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
    );
  }
}
