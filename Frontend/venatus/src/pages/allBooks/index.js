import React, { Component } from 'react';

import './styles.css';
import lupa from '../../assets/allBooks/lupa-branca.svg'
import nya from '../../assets/main/nya.svg';
import carrinho from '../../assets/header/carrinho.svg'

export default class books extends Component {

    testBtn() {
        alert('Oi');
    }

  render() {
    return (
        <div id="books-container">
            <div className="search-wrapper">
                <div className="search-container">
                    <form>
                        <input type="text" className="search-input" placeholder="O que você procura?"></input>
                        <a href="/" className="search-btn">
                            <img src={lupa} alt="lupa"></img>
                        </a>
                    </form>
                </div>
            </div>
            <div className="allBooks-wrapper">
                <h1>Livros da Editora</h1>
                <section className="allBooks-Container">
                    <ul>
                        <li>
                            <a href="/">
                                <img src={nya} alt="Nya" />
                            </a>
                            <h2>Nya - #ConexãoPulmãoVerde</h2>
                            <p>R$ 39,90</p>
                                <button onClick={this.testBtn}>
                                    <img src={carrinho} />
                                    <p>Adicionar ao Carrinho</p>
                                </button>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    );
  }
}
