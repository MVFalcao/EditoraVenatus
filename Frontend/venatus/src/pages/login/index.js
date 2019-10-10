import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles.css'
import logo from '../../assets/header/logo.svg';

export default class login extends Component {
  render() {
    return (
      <>
        <div className="login-container">
          <Link to="/">
            <img src={logo} alt="Logo Venatus"/>
          </Link>
          <div className="login-content">
            <p>Tenha acesso a nossa editora</p>
            <form>
              <label htmlFor="username">Usuário</label>
              <input id="username" type="username" placeholder="Digite seu usuário" required />
              
              <label htmlFor="password">Senha</label>
              <input id="password" type="password" placeholder="Digite sua senha" required />
              
              <Link to="/" id="forgot">Esqueceu a senha?</Link>
              <button type="submit">Entrar</button>
            </form>
            <p id="signup">Novo na Venatus? <Link to="/SignIn">Crie uma conta</Link></p>
          </div>
        </div>
      </>
    );
  }
}
