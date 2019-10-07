import React, { Component } from 'react';

import './styles.css';
import nya from '../../assets/book/nya-grande.svg'

export default class book extends Component {
  render() {
    return (
        <div className="book-container">
            <div className="left-content">
                <img src={nya} alt="Imagem do Livro" />
                <p id="ISBN">ISBN: 978-85-924294-1-6</p>
                <p id="synopsis">Sinopse: Lorem ipsum vel bibendum pharetra sed ut feugiat massa eget accumsan mauris primis, habitant dui cras mauris tellus ligula dictum neque cursus ligula vitae.</p>
            </div>
            <div className="main-content">
                <h1>Nya:</h1>
                <h2>#ConexãoPulmãoVerde</h2>
                <p id="book-price">R$ 39,99</p>
                <form>
                    <label htmlFor="book-quantity">Quantidade</label>
                    <input type="number" id="book-quantity" defaultValue="1" min="1" required/>
                    <button type="submit">Adicionar ao Carrinho</button>
                </form>
                <div className="dropdown-container">
                    <button className="dropbtn">
                        <p>Descrição do Livro</p>
                        <p id="plus">+</p>
                    </button>
                    <div className="dropdown-content">
                        <p>Categoria: Aventura</p>
                    </div>
                </div> 
            </div>
            <div className="right-content">
                <p id="book-Author">Autor(a): Erica Falcão</p>
                <p id="book-Illustrator">Ilustrador(a): Heitor Neto</p>
                <p id="book-Language">Idioma: Português</p>
                <p id="book-Format">Formato: 15x21 cm</p>
                <p id="book-pages">N° de Páginas: 92</p>
                <p id="book-year">Ano de Publicação: 2019</p>
            </div>
        </div>
    );
  }
}
