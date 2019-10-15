import React, { useState } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './styles.css';
import nya from '../../assets/book/nya-grande.svg';
import age10 from '../../assets/book/10+.svg'

function Book() {

    let divClosedList = [true, true, true];

    function handleDiv(SymbolItem = "", contentDiv = "", item = 0) {
        let SymbolEmt = document.querySelector(SymbolItem);
        let dropdownContent = document.querySelector(contentDiv);

        const showDiv = () => {
            dropdownContent.style.display = "flex";
        }
        const hideDiv = () => {
            dropdownContent.style.display = "none";
        }
        if (divClosedList[item]) {
            showDiv();
            SymbolEmt.innerHTML = "-";
            divClosedList[item] = false;
            handleDivClose(contentDiv);
        } else {
            hideDiv();
            SymbolEmt.innerHTML = "+";
            divClosedList[item] = true;
        }
    }

    function handleDivClose(contentDiv = "") {
        let SymbolEmtList = document.querySelectorAll('.plus');
        let dropdownContentList = document.querySelectorAll('.dropdown-content');
        
        if (contentDiv === '.dropdown-content.item-1') {
            dropdownContentList[1].style.display = dropdownContentList[2].style.display = "none";
            SymbolEmtList[1].innerHTML = SymbolEmtList[2].innerHTML = "+";
            divClosedList[1] = divClosedList[2] = true;
        } else if (contentDiv === '.dropdown-content.item-2') {
            dropdownContentList[0].style.display = dropdownContentList[2].style.display = "none";
            SymbolEmtList[0].innerHTML = SymbolEmtList[2].innerHTML = "+";
            divClosedList[0] = divClosedList[2] = true;
        } else {
            dropdownContentList[0].style.display = dropdownContentList[1].style.display = "none";
            SymbolEmtList[0].innerHTML = SymbolEmtList[1].innerHTML = "+";
            divClosedList[0] = divClosedList[1] = true;
        }
    }

    return (
        <>
            <Header />
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
                        <ul>
                            <li>
                                <button className="dropbtn" onClick={() => handleDiv('.plus.item-1','.dropdown-content.item-1', 0)}>
                                    <h3>Descrição do Livro</h3>
                                    <p className="plus item-1">+</p>
                                </button>
                                <div className="dropdown-content item-1">
                                    <p>Categoria: Aventura</p>
                                    <p id="info01">
                                        Indicação: Maiores de 10 anos
                                        <img src={age10} alt="Indicação de idade"/> 
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div className="categories-line item-1" />
                            </li>
                            <li>
                                <button className="dropbtn" onClick={() => handleDiv('.plus.item-2','.dropdown-content.item-2', 1)}>
                                    <h3>Informações do Frete</h3>
                                    <p className="plus item-2">+</p>
                                </button>
                                <div className="dropdown-content item-2">
                                    <p> Frete incluso para todo o Brasil. </p>
                                    <p> 
                                        Prazo de entrega: 7 a 10 dias úteis, a partir da confirmação do pagamento.
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div className="categories-line item-2" />
                            </li>
                            <li>
                                <button className="dropbtn" onClick={() => handleDiv('.plus.item-3','.dropdown-content.item-3', 2)}>
                                    <h3>Extras</h3>
                                    <p className="plus item-3">+</p>
                                </button>
                                <div className="dropdown-content item-3">
                                    <p> Livro autografado </p>
                                    <p>Brinde: 01 Marcador de livro em formato card.</p>
                                </div>
                            </li>
                        </ul>

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
            <Footer />
        </>
    );
}

export default Book;