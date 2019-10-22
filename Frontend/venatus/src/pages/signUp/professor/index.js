import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
import logo from '../../../assets/header/logo.svg';
import api from '../../../services/api';


function SignUp() {

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const birthDateSplit = birthDate.split("-");
    const bd = birthDateSplit[2] + "/" + birthDateSplit[1] + "/" + birthDateSplit[0];

    const response = await api.post('/api/SignIn', {
      'Nome': name,
      'Cpf': cpf,
      'Email': email,
      'Senha': password,
      'Tipo_Pessoa': "normal",
      'Data_Nascimento': bd,
      'sexo': 'M'
    });

    console.log(response);
    
  }

  // function handlePassword(password, confirmPassword) {
  //   console.log('socorro');
    
  //   // while (password !== confirmPassword) {
  //   //   let errorMessage = document.createElement('div');
  //   //   errorMessage.setAttribute('className', 'password-error');
      
  //   // }


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

          <label htmlFor="cpf">CPF <span>*</span></label>
          <input type="text" 
          id="cpf" 
          value={cpf} 
          required 
          onChange={event => setCpf(event.target.value)} 
          />

          <label htmlFor="birthDate">Data de Nascimento <span>*</span></label>
          <input
          type="date"
          id="birthDate" 
          required
          value={birthDate} 
          onChange={event => setBirthDate(event.target.value)} 
          />

           {/* <label>Sexo <span>*</span></label>
          <div className="gender-container">
            <label>
              <input 
              type="radio" 
              name="gender"
              value={gender}
              onChange={event => setGender(event.target.value)} 
              /> <span>Masculino</span>
            </label>

            <label>
              <input 
              type="radio" 
              name="gender"
              value={gender}
              onChange={event => setGender(event.target.value)} 
              /> <span>Feminino</span>
            </label>
          </div> */}

            {/*<label>
              <input 
              type="radio" 
              name="registerType"
              value={tipoPessoa}
              onChange={event => setTipoPessoa(event.target.value)} 
              /> <span>Blogueiro(a)</span>
            </label>
           */}

          <label id="password-label" htmlFor="password">Senha <span>*</span></label>
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
          onChange={event => setConfirmPassword(event.target.value)} />

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

export default SignUp;
