import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './styles.css';
import lupa from '../../assets/allBooks/lupa-branca.svg'
import nya from '../../assets/main/nya.svg';
import carrinho from '../../assets/header/carrinho.svg'

export default class books extends Component {
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
                            required 
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
                            <li>
                                <Link to="/bookPage">
                                    <img src={nya} alt="Nya" />
                                </Link>
                                <h2>Nya - #ConexãoPulmãoVerde</h2>
                                <p>R$ 39,90</p>
                                    <button>
                                        <img src={carrinho} alt="Carrinho" />
                                        <p>Adicionar ao Carrinho</p>
                                    </button>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
            <Footer />
            </>
    );
  }
}
