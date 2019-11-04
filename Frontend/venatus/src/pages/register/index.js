import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';
import logo from '../../assets/header/logo.svg';
import imgUpload from '../../assets/administrator/imgUpload.svg'

export default class signup extends Component {

  state = {
    Name: '',
    LastName: '',
    Username: '',
    Email: '',
    Gender: 'M',
    Tipo_Pessoa: '',
    CPF: '',
    Birthdate: '',
    Password: '',
    ConfirmPassword: '',

    ProfessorImage: null,
  }

  handleGender = (e, value) => {
    this.setState({ Gender: value })
  }

  handlePreview = (event) => {
    this.setState({ProfessorImage: URL.createObjectURL(event.target.files[0])});
  };

  handleSubmit = async event => {
    event.preventDefault();

    // const birthdateSplit = this.state.birthdate.split("-");
    // const bd = birthdateSplit[2] + "/" + birthdateSplit[1] + "/" + birthdateSplit[0];

    await api.post('/api/Pessoas', {
      'Nome': this.state.Name,
      'Cpf': this.state.CPF,
      'Email': this.state.Email,
      'Senha': this.state.Password,
      'Tipo_Pessoa': this.state.PersonType,
      'Data_Nascimento': this.state.Data_Nascimento,
      'sexo': this.state.Gender,
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
        this.setState({Tipo_Pessoa: "normal"});
      break;
      case 2:
        const professorImage = document.querySelector('#professorImage-container');
        document.querySelector('#organizer-li').style.display = "flex";
        registerPopup.style.display = "none";
        signupContent.style.display = "flex";
        professorImage.style.display = "flex";
        this.setState({Tipo_Pessoa: "professor"});
      break;
      case 3:
        const socialMedia = document.querySelector('#socialMedia-container');
        document.querySelector('#organizer-li').style.display = "flex";
        registerPopup.style.display = "none";
        signupContent.style.display = "flex";
        socialMedia.style.display = "block";
        this.setState({Tipo_Pessoa: "blog"});
      break;
      default:
        console.log("Continua a vida");
      break;
    }
  }

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

          <div className="line item-2" />

          <form onSubmit={this.handleSubmit}>
            <ul>

              <li>
                <label htmlFor="name">Nome <span>*</span></label>
                <input type="text" 
                  id="name"
                  required
                  value={this.state.Name} 
                  onChange={e => this.setState({Name: e.target.value})}
                />
              </li>

              <li>
                <label htmlFor="last-name">Sobrenome <span>*</span></label>
                <input type="text" 
                  id="last-name"
                  required
                  value={this.state.LastName} 
                  onChange={e => this.setState({LastName: e.target.value})}
                />
              </li>

              <li>
                <label htmlFor="username">Usuário <span>*</span></label>
                <input type="text" 
                  id="username" 
                  required
                  value={this.state.Username} 
                  onChange={e => this.setState({Username: e.target.value})} 
                />
              </li>

              <li>
                <label htmlFor="email">Email <span>*</span></label>
                <input type="email" 
                  id="email" 
                  required
                  value={this.state.Email}
                  onChange={e => this.setState({Email: e.target.value})}
                />
              </li>

              <li>
                <label htmlFor="cpf">CPF <span>*</span></label>
                <input type="text" 
                  id="cpf"
                  required
                  value={this.state.CPF}
                  onChange={e => this.setState({CPF: e.target.value})} 
                />
              </li>

              <li>
                <label htmlFor="birthDate">Data de Nascimento <span>*</span></label>
                <input
                  type="date"
                  id="birthDate" 
                  required
                  value={this.state.Birthdate} 
                  onChange={e => this.setState({Birthdate: e.target.value})} 
                />
              </li>

              <li id="socialMedia-container">
                {/* <div > */}
                  <label htmlFor="social-media">Link da rede social <span>*</span></label>
                  <input type="text" 
                    id="social-media"
                    placeholder="Sua rede social mais relevante"
                    required
                    // value={this.state.CPF}
                    // onChange={e => this.setState({cpf: e.target.value})} 
                  />
                {/* </div> */}
              </li>
              
              <li id="professorImage-container">
                {/* <div > */}
                  <label htmlFor="professor-input">Comprovante de profissão <span>*</span></label>
                    <label id="professor-image" htmlFor="professor-input" className={this.state.ProfessorImage ? 'has-image' : ''} style={{ backgroundImage: `url(${this.state.ProfessorImage})`}}>  
                      <input type="file" 
                      id="professor-input"
                      required
                      accept=".png, .jpg, .jpeg"
                      onChange={this.handlePreview} 
                      />
                      <img src={imgUpload} alt="IconeDeImagem"/>
                    </label>
                    {console.log(this.state.ProfessorImage)}
                {/* </div> */}
              </li>

              <li id="gender-wrapper">
                <label>Sexo <span>*</span></label>
                <div className="gender-container">
                  
                  <input type="radio"
                    id="gender-m" 
                    name="gender"
                    value='M'
                    checked = {this.state.Gender === 'M'}
                    onChange={(e) => this.handleGender(e, 'M')}
                  />
                  <label htmlFor="gender-m">Masculino</label>
                  
                  <input type="radio"
                    id="gender-f" 
                    name="gender"
                    value='F'
                    checked = {this.state.Gender === 'F'}
                    onChange = {(e) => this.handleGender(e, 'F')}
                  />
                  <label htmlFor="gender-m">Feminino</label>

                </div>
                {/* {console.log(this.state.Gender)} */}
              </li>

              <li id="organizer-li" style={{display: "none"}} />

              <li>
                <label id="password-label" htmlFor="password">Senha <span>*</span></label>
                <input 
                  type="password" 
                  id="password" 
                  required 
                  placeholder="Senha de 6 dígitos"
                  value={this.state.Password} 
                  onChange={e => this.setState({password: e.target.value})}
                />
              </li>

              <li>
                <label htmlFor="confirm-password">Confirme a senha <span>*</span></label>
                <input 
                  type="password" 
                  id="confirm-password"
                  required
                  placeholder="Redigite sua senha" 
                  value={this.state.ConfirmPassword} 
                  onChange={e => this.setState({confirmPassword: e.target.value})} />
              </li>

            </ul>

            <div className="buttons">
                <button type="submit">Criar Conta</button>
                <Link to="/Login">Cancelar</Link>
            </div>
            
          </form>

        </div>

        <p id="footer">&copy; Editora Venatus</p>

      </div>
    );
  }
}
