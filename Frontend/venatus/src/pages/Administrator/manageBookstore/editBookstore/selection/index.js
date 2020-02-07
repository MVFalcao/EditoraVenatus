import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../../../services/api';

import Dashboard from '../../../../../components/Dashboard';

import './styles.css';
import BookstoreImg from '../../../../../assets/administrator/bookstoreImg.svg';

export default class editBook extends Component {

  state = {
    allBookstores: [],
  }

  async loadBookstores() {
    const response = await api.get('/api/Livrarias').catch(function (error) {
      console.log(error);
    });
    if (response != null) {
      console.log(response);
      this.setState({allBookstores: response.data});
    }
  }

  componentDidMount() {
    this.loadBookstores();
  }

  render() {
    return (
        <div className="selectBookstore-wrapper">
          <Dashboard />
          <div className="selectBookstore-container">
 
            <h1>Selecione a Livraria a ser editada</h1>

            <ul>
              {this.state.allBookstores.map(bookstore => (
                <li key={bookstore.ID_Livraria}>
                  <Link to={`/administrator/editbookstore/${bookstore.ID_Livraria}`}>
                    <img src={BookstoreImg} alt={bookstore.Titulo}/>
                    <h2>{bookstore.Nome}</h2>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
    );
  }
}
