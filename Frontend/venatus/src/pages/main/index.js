import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './styles.css';
import faixa_azul from '../../assets/main/faixa_azul.svg';

export default class main extends Component {

  state = {
    allRealeaseBooks: [],
  }

  async loadReleaseBooks() {
    const response = await api.get('/api/Livros/Lancamento').catch(function (error) {
      console.log(error);
    });
    if (response != null) {
      console.log(response);
      this.setState({allRealeaseBooks: response.data});
    }
  }

  componentDidMount() {
    this.loadReleaseBooks();
  }

  render () {
    return (
      <>
        <Header />
        <div className="main-container">

          <h1>Últimos Lançamentos</h1>

          <div className="main-background">

            <section className="main-content">

                <ul>
                  {this.state.allRealeaseBooks.map(book => (
                    <li key={book.ID_Livro}>
                      <Link to={`/bookPage/${book.ID_Livro}`}>
                        <img src={book.Imagem_URL} alt={book.Titulo} />
                      </Link>
                      <h2>{book.Titulo} {book.SubTitulo}</h2>
                      <p>R$ {parseFloat(book.Preco).toFixed(2)}</p>
                      <Link to={`/bookPage/${book.ID_Livro}`} id="BookBtn">Saiba mais</Link>
                    </li>
                  ))}
                  
                </ul>
                
            </section>
          </div>
          <div className="about-venatus">
            <h1>Sobre Venatus</h1>
            <p>Lorem ipsum vel bibendum pharetra sed ut feugiat massa eget accumsan mauris primis, habitant dui cras mauris tellus ligula dictum neque cursus ligula vitae. luctus sit habitasse a luctus vitae tristique torquent amet libero purus justo, varius nec aliquam tortor nisl diam dui risus eros arcu donec fusce, ut sagittis augue etiam est inceptos ante sollicitudin felis fames.</p>
            <div className="about-line">
              <img src={faixa_azul} alt="Faixa Azul" />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}