import React, { Component } from 'react';
import api from '../../../../services/api';

import Dashboard from '../../../../components/Dashboard';

import './styles.css';
import BookstoreImg from '../../../../assets/administrator/bookstoreImg.svg';

export default class editBook extends Component {

  state = {
    allBookstores: [],
    index: 0,
    books: [],
  }

  async loadBookstores() {
    const response = await api.get('/api/Livrarias').catch(function (error) {
      console.log('Error: ' + error.message);
    });
    if (response != null) {
      console.log(response);
      this.setState({allBookstores: response.data});
    }
  }

  deleteBook = async (ID_Livraria = 0) => {
    const response = await api.delete(`/api/Livrarias/${ID_Livraria}`).catch(function(error) {
      console.log('Error: ' + error.message);
    });
    if (response != null) {
      alert('Livraria apagada com sucesso');
    }
  }

  handleDeleteBookstore = (ID_Livraria = 0, index = 0) => {
    let confirmDelete = window.confirm(`Deseja realmente deletar a livraria ${this.state.allBookstores[index].Nome}?`);
    if (confirmDelete) this.deleteBook(ID_Livraria);
    else return;
  }

  componentDidMount() {
    this.loadBookstores();
  }

  render() {
    return (
        <div className="selectBookstore-wrapper">
          <Dashboard />
          <div className="selectBookstore-container">

            <h1>Selecione a Livraria a ser deletada</h1>

            <ul>
              {this.state.allBookstores.map((bookstore, index) => (
                <li key={bookstore.ID_Livraria}>
                  <button onClick={() => this.handleDeleteBookstore(bookstore.ID_Livraria, index)}>
                    <img src={BookstoreImg} alt={bookstore.Nome}/>
                    <h2>{bookstore.Nome}</h2>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
    );
  }
}
