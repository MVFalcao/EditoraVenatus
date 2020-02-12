import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../../../services/api';

import Dashboard from '../../../../../components/Dashboard';

import './styles.css';
import BookstoreImg from '../../../../../assets/administrator/bookstoreImg.svg';

export default class editBook extends Component {

  state = {
    allAuthors: [],
  }

  async loadAuthors() {
    api.get('/api/Autors').then(res => {
      console.log(res.data);
      this.setState({allAuthors: res.data});
    }).catch(error => {
      console.log('Authors -> ' + error);
    });
  }

  componentDidMount() {
    this.loadAuthors();
  }

  render() {
    return (
        <div className="selectAuthor-wrapper">
          <Dashboard />
          <div className="selectAuthor-container">
 
            <h1>Selecione o Autor a ser editado</h1>

            <ul>
              {this.state.allAuthors.map(author => (
                <li key={author.ID_Autor}>
                  <Link to={`/administrator/editauthor/${author.ID_Autor}`}>
                    <img src={BookstoreImg} alt={author.Nome}/>
                    <h2>{author.Nome}</h2>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
    );
  }
}
