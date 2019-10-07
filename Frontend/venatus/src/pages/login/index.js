import React, { Component } from 'react';

import './styles.css'
import logo from '../../assets/header/logo.svg';

export default class login extends Component {
  render() {
    return <div>
      <div className="login-container">
        <a href="/">
          <img src={logo} alt="Logo Venatus"/>
        </a>
        <div className="login-content">
          <p>Tenha acesso a nossa editora</p>
          <form>
            <label htmlFor="username">Usuário</label>
            <input id="username" type="username" placeholder="Digite seu usuário" required />
            
            <label htmlFor="password">Senha</label>
            <input id="password" type="password" placeholder="Digite sua senha" required />
            
            <a href="/" id="forgot">Esqueceu a senha?</a>
            <button type="submit">Entrar</button>
          </form>
          <p id="signup">Novo na Venatus? <a href="/">Crie uma conta</a></p>
      </div>
      </div>
    </div>;
  }
}
