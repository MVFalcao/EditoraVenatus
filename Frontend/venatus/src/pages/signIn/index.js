import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
import logo from '../../assets/header/logo.svg';

export default class signin extends Component {
  render() {
    return ( 
      <div className="signin-container">
        <div className="signin-content">
          <Link to="/">
            <img src={logo} alt="Logo da Venatus"/>
          </Link>
          <p>Entre na Venatus</p>
          <h1>Crie sua conta</h1>

          <form>
            <label htmlFor="name">Nome <span>*</span></label>
            <input type="text" id="name" />

            <label htmlFor="username">Usuário <span>*</span></label>
            <input type="text" id="username" />

            <label htmlFor="email">Email <span>*</span></label>
            <input type="email" id="email" />

            <label htmlFor="password">Senha <span>*</span></label>
            <input type="password" id="password"/>

            <label htmlFor="confirm-password">Confirme a senha <span>*</span></label>
            <input type="password" id="confirm-password"/>
            <div className="buttons">
                <Link to="/">Cancelar</Link>
                <button type="submit">Criar Conta</button>
            </div>
          </form>
        </div>
        <p id="footer">&copy; Editora Venatus</p>
      </div>
    );
  }
}
