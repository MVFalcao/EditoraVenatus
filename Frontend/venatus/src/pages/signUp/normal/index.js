import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
import logo from '../../../assets/header/logo.svg'
import api from '../../../services/api';

export default class signup extends Component {

  state = {
    Name: '',
    LastName: '',
    Username: '',
    Email: '',
    Gender: '',
    CPF: '',
    Birthdate: '',
    Password: '',
    ConfirmPassword: '',
  }

  componentDidMount = async e => {
    const response = await api.get('/api/Login').catch(function (error) {
      console.log('Erro:' + error.message);
    });
    if (response != null) {
      console.log(response);
    }
  }

  handleSubmit = async event => {
    event.preventDefault();

    const birthdateSplit = this.state.birthdate.split("-");
    const bd = birthdateSplit[2] + "/" + birthdateSplit[1] + "/" + birthdateSplit[0];

    await api.post('/api/Pessoas', {
      'Nome': this.state.Name,
      'Cpf': this.state.CPF,
      'Email': this.state.Email,
      'Senha': this.state.Password,
      'Tipo_Pessoa': "normal",
      'Data_Nascimento': bd,
      'sexo': 'M'
    }).catch(function (error) {
      console.log(error.response);
      console.log("Error: " + error.message);
    });
  }

  // function handlePassword(password, confirmPassword) {
  //   console.log('socorro');
    
  //   // while (password !== confirmPassword) {
  //   //   let errorMessage = document.createElement('div');
  //   //   errorMessage.setAttribute('className', 'password-error');
      
  //   // }

  render() {
    return (
      <div className="signin-container">

        <div className="signin-content">

          <Link to="/">
            <img src={logo} alt="Logo da Venatus"/>
          </Link>

          <p>Entre na Venatus</p>
          <h1>Crie sua conta</h1>

          <form onSubmit={this.handleSubmit}>

            <label htmlFor="name">Nome <span>*</span></label>
            <input 
              type="text" 
              id="name"
              required
              value={this.state.Name} 
              onChange={e => this.setState({Name: e.target.value})}
            />

            <label htmlFor="username">Usuário <span>*</span></label>
            <input
            type="text" 
            id="username" 
            required
            value={this.state.Username} 
            onChange={e => this.setState({username: e.target.value})} 
            />

            <label htmlFor="email">Email <span>*</span></label>
            <input type="email" 
            id="email" 
            required
            value={this.state.Email}
            onChange={e => this.setState({email: e.target.value})}
            />

            <label htmlFor="cpf">CPF <span>*</span></label>
            <input type="text" 
            id="cpf"
            required
            value={this.state.CPF}
            onChange={e => this.setState({cpf: e.target.value})} 
            />

            <label htmlFor="birthDate">Data de Nascimento <span>*</span></label>
            <input
            type="date"
            id="birthDate" 
            required
            value={this.state.Birthdate} 
            onChange={e => this.setState({birthdate: e.target.value})} 
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
            value={this.state.Password} 
            onChange={e => this.setState({password: e.target.value})}
            />


            <label htmlFor="confirm-password">Confirme a senha <span>*</span></label>
            <input 
            type="password" 
            id="confirm-password"
            required
            placeholder="Redigite sua senha" 
            value={this.state.ConfirmPassword} 
            onChange={e => this.setState({confirmPassword: e.target.value})} />

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
