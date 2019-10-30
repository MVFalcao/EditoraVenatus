import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';
import logo from '../../assets/header/logo.svg';

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

  handleRegisterApi = async e => {
    const response = await api.get('/api/Login').catch(function (error) {
      console.log('Erro: ' + error.message);
    });
    if (response != null) {
      console.log(response);
    }
  } 

  componentDidMount() {
    this.handleRegisterApi();
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
      console.log("Error: " + error.message);
    });
  }

  handlePopUp = (item = 0) => {
    const registerPopup = document.querySelector('.registerType-popup');
    const signupContent = document.querySelector('.signin-content');

    switch(item) {
      case 1:
        registerPopup.style.display = "none";
        signupContent.style.display = "flex";
      break;
      case 2:
        const professorImage = document.querySelector('.professorImage-container');
        registerPopup.style.display = "none";
        signupContent.style.display = "flex";
        professorImage.style.display = "block";
      break;
      case 3:
        const socialMedia = document.querySelector('.socialMedia-container');
        registerPopup.style.display = "none";
        signupContent.style.display = "flex";
        socialMedia.style.display = "block";
      break;
      default:
        console.log("Continua a vida");
      break;
    }
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

        <div className="registerType-popup">
          <Link to="/">
            <img src={logo} alt="Logo Venatus"/>
          </Link>
          <div className="line" />
          <h1>Qual será o tipo de cadastro?</h1>

          <div className="register-buttons">

            <button className="registerBtn item-1" onClick={() => this.handlePopUp(1)}>Normal</button>
            <button className="registerBtn item-2" onClick={() => this.handlePopUp(2)}>Professor</button>
            <button className="registerBtn item-3" onClick={() => this.handlePopUp(3)}>Blogueiro</button>

          </div>       
        </div>

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
            onChange={e => this.setState({Username: e.target.value})} 
            />

            <label htmlFor="email">Email <span>*</span></label>
            <input type="email" 
            id="email" 
            required
            value={this.state.Email}
            onChange={e => this.setState({Email: e.target.value})}
            />

            <label htmlFor="cpf">CPF <span>*</span></label>
            <input type="text" 
            id="cpf"
            required
            value={this.state.CPF}
            onChange={e => this.setState({CPF: e.target.value})} 
            />

            <label htmlFor="birthDate">Data de Nascimento <span>*</span></label>
            <input
            type="date"
            id="birthDate" 
            required
            value={this.state.Birthdate} 
            onChange={e => this.setState({Birthdate: e.target.value})} 
            />
            
            <div className="socialMedia-container">
              <label htmlFor="social-media">Link da rede social <span>*</span></label>
              <input type="text" 
              id="social-media"
              placeholder="Sua rede social mais relevante"
              required
              // value={this.state.CPF}
              // onChange={e => this.setState({cpf: e.target.value})} 
              />
            </div>

            <div className="professorImage-container">
              <label htmlFor="professor-image">Comprovante de profissão <span>*</span></label>
              <input type="file" 
              id="professor-image"
              required
              // value={this.state.CPF}
              // onChange={e => this.setState({cpf: e.target.value})} 
              />
            </div>

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

                <Link to="/Login">Cancelar</Link>
                <button type="submit">Criar Conta</button>
            
            </div>

          </form>

        </div>

        <p id="footer">&copy; Editora Venatus</p>

      </div>
    );
  }
}
