import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './styles.css';
import lupa from '../../assets/allBooks/lupa-branca.svg'
import carrinho from '../../assets/header/carrinho.svg'


export default class books extends Component {
 

    state = {
        Search: '',
        allBooks: [],
    }
    async loadBooks() {
        const response = await api.get('/api/Livros').catch(function (error) {
            console.log(error);
        });
        if(response != null) 
        {
            //console.log(response);
            this.setState({allBooks: response.data});
        }
        // console.log(this.state.allBooks);
    }
    componentDidMount() {
        this.loadBooks();
    }

    // Pegar o preco da api e modificar quando aumentar ou descrescer o input

    render() {
        return (
            <>
            <Header />
            <div id="books-container">
                <div className="search-wrapper">
                    <div className="search-container">
                        <form>
                            <input 
                            type="text" 
                            className="search-input"
                            placeholder="O que você procura?"
                            value={this.state.search}
                            onChange={() => this.setState({ Search: this.state.Search})}
                            />
                            <Link to="/" className="search-btn">
                                <img src={lupa} alt="lupa"></img>
                            </Link>
                        </form>
                    </div>
                </div>
                <div className="allBooks-wrapper">
                    <h1>Livros da Editora</h1>
                    <section className="allBooks-Container">
                        <ul>
                        {this.state.allBooks.map(book => (
                                <li key={book.ID_Livro}>
                                    <Link to={`/bookPage/${book.ID_Livro}`}>
                                        <img src={book.Imagem_URL} alt={book.Titulo} />
                                    </Link>

                                    <h2>{book.Titulo} {book.SubTitulo}</h2>

                                    <p>R$ {parseFloat(book.Preco).toFixed(2)}</p>

                                    <button>
                                        <img src={carrinho} alt="Carrinho" />
                                        <p>Adicionar ao Carrinho</p>
                                    </button>
                                </li>
                            )
                        )}
                        </ul>
                    </section>
                </div>
            </div>
            <Footer />
            </>
    );
  }
}
