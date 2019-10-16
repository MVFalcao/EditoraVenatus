import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './styles.css'
import logo from '../../assets/header/logo.svg';

function Login() {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    
  } 

  return (
    <>
      <div className="login-container">
        <Link to="/">
          <img src={logo} alt="Logo Venatus"/>
        </Link>
        <div className="login-content">
          <p>Tenha acesso a nossa editora</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Usuário</label>
            <input 
              id="username" 
              type="text"
              required
              value={username}
              onChange={event => setUsername(event.target.value)}
            />
            
            <label htmlFor="password">Senha</label>
            <input 
              id="password" 
              type="password"
              required
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
            
            <Link to="/" id="forgot">Esqueceu a senha?</Link>
            <button type="submit">Entrar</button>
          </form>
          <p id="signup">Novo na Venatus? <Link to="/SignIn">Crie uma conta</Link></p>
        </div>
      </div>
    </>
  );
}

export default Login;
