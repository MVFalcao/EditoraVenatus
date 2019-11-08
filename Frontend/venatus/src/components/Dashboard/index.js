import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
import Logo from '../../assets/header/logo.svg';
import AngleDown from '../../assets/Dashboard/angle-down.svg';
import AngleRight from '../../assets/Dashboard/angle-right.svg';

export default class Dashboard extends Component {

    state = {
        divClosedList: [true, true, true, true, true],
    }

     handleDiv = (SymbolItem = "", contentDiv = "", item = 0) => {
        let SymbolEmt = document.querySelector(SymbolItem);
        let dropdownContent = document.querySelector(contentDiv);

        const showDiv = () => {
            dropdownContent.style.display = "flex";
        }
        const hideDiv = () => {
            dropdownContent.style.display = "none";
        }
        if (this.state.divClosedList[item]) {
            showDiv();
            SymbolEmt.src = `${AngleDown}`;
            SymbolEmt.style.width = '13px';
            let a = this.state.divClosedList;
            a[item] = false;
            this.setState({divClosedList: a});
        } else {
            hideDiv();
            SymbolEmt.src = `${AngleRight}`;
            SymbolEmt.style.width = '8px';
            let a = this.state.divClosedList;
            a[item] = true;
            this.setState({divClosedList: a});
        }
    }

  render() {
    return (
        <div className="dashboard-container">

            <div className="administrator-panel">

                <div className="dashboard-header">
                    <img src={Logo} alt="Logo Venatus"/>
                    <h1>Painel do Administrador</h1>
                </div>

                <div className="categories register">

                    <button className="categoriesBtn" onClick={() => this.handleDiv('.angle.item-1', '.dropdown.register', 0)}>
                        <h2> Gerenciamento de Cadastros</h2>
                        <img className="angle item-1" src={AngleRight} alt="Seta"/>
                    </button>

                    <div className="dropdown register">

                        <button onClick={() => this.handleDiv('.angle.item-2', '.dropdown.bookstore', 1)}>
                            <h3>Livrarias</h3>
                            <img className="angle item-2" src={AngleRight} alt="Seta" />
                        </button>

                        <div className="dropdown bookstore ">

                            <ol>
                                <li><Link to="/addbookstore">Adicionar Livraria</Link></li>
                                <li><Link to="/editbookstore/selection">Editar Livraria</Link></li>
                                <li><Link to="/deletebookstore">Deletar Livraria</Link></li>
                            </ol>

                        </div>

                            <button onClick={() => this.handleDiv('.angle.item-3', '.dropdown.school', 2)}>
                                <h3>Escolas</h3>
                                <img className="angle item-3" src={AngleRight} alt="Seta" />
                            </button>

                        <div className="dropdown school">
                            
                            <ol>
                                <li><Link to="">Adicionar Escola</Link></li>
                                <li><Link to="">Editar Escola</Link></li>
                                <li><Link to="">Deletar Escola</Link></li>
                            </ol>

                        </div>
                    </div>
                </div>

                <div className="categories book-manager">

                    <button className="categoriesBtn" onClick={() => this.handleDiv('.angle.item-4', '.dropdown.book', 3)}>
                        <h2>Gerenciamento de Livros</h2>
                        <img className="angle item-4" src={AngleRight} alt="Seta" />
                    </button>

                    <div className="dropdown book">

                        <ol>
                            <li><Link to="/addBook">Adicionar Livro</Link></li>
                            <li><Link to="/editbook/selection">Editar Livro</Link></li>
                            <li><Link to="/deletebook">Deletar Livro</Link></li>
                        </ol>

                    </div>
                </div>
               
                <div className="categories event-manager">

                <button className="categoriesBtn" onClick={() => this.handleDiv('.angle.item-5', '.dropdown.event', 4)}>
                    <h2>Gerenciamento de Eventos</h2>
                    <img className="angle item-5" src={AngleRight} alt="Seta" />
                </button>

                <div className="dropdown event">

                    <ol>
                        <li><Link to="/">Adicionar Evento</Link></li>
                        <li><Link to="/">Editar Evento</Link></li>
                        <li><Link to="/">Deletar Evento</Link></li>
                    </ol>

                </div>
                </div>
            </div>
        </div>
    );
  }
}
