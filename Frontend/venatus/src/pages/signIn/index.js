import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
import logo from '../../assets/header/logo.svg';

function SignIn() {

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handlePassword(password, confirmPassword) {
    console.log('socorro');
    
    // while (password !== confirmPassword) {
    //   let errorMessage = document.createElement('div');
    //   errorMessage.setAttribute('className', 'password-error');
      
    // }
  }

  return (
    <div className="signin-container">

      <div className="signin-content">

        <Link to="/">
          <img src={logo} alt="Logo da Venatus"/>
        </Link>

        <p>Entre na Venatus</p>
        <h1>Crie sua conta</h1>

        <form onSubmit={handleSubmit}>

          <label htmlFor="name">Nome <span>*</span></label>
          <input 
            type="text" 
            id="name"
            required
            value={name} 
            onChange={event => setName(event.target.value)}
          />

          <label htmlFor="username">Usuário <span>*</span></label>
          <input
          type="text" 
          id="username" 
          required
          value={username} 
          onChange={event => setUsername(event.target.value)} 
          />

          <label htmlFor="email">Email <span>*</span></label>
          <input type="email" 
          id="email" 
          value={email} 
          required 
          onChange={event => setEmail(event.target.value)} 
          />

          <label htmlFor="password">Senha <span>*</span></label>
          <input 
          type="password" 
          id="password" 
          required 
          placeholder="Senha de 6 dígitos" 
          value={password} 
          onChange={event => setPassword(event.target.value)}
          />


          <label htmlFor="confirm-password">Confirme a senha <span>*</span></label>
          <input 
          type="password" 
          id="confirm-password"
          required
          placeholder="Redigite sua senha" 
          value={confirmPassword} 
          onChange={event => setConfirmPassword(event.target.value), () => handlePassword('password', 'confirmPassword')} />

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

export default SignIn;
