import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import api from '../../services/api';

import './styles.css'
import logo from '../../assets/header/logo.svg';

export default class Login extends Component {

  state = {
    Username: '',
    Password: '',

    goToMain: false,
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await api.get('api/Logins', {
      "Username": this.state.Username,
      "Password": this.state.Password,
    }).then(response => {
      localStorage.setItem("jwt", response.data);
      this.setState({goToMain: true});
    }).catch(error => {
      console.log('Error: ' + error.message);
      alert('Algo deu errado');
    });

    console.log(response);
  } 

  async componentDidMount() {
    try {
        const response = await api.get('api/Login');

        if(response != null) {
            this.setState({goToMain: true});
        }

    } catch(error) 
    {
        console.log('Nenhuma conta está logada');
    };
}

  render() {

    if (this.state.goToMain) return <Redirect to='/Main' />

    return (
      <div className="login-wrapper">

        <div className="login-container">

          <Link to="/">
            <img src={logo} alt="Logo Venatus"/>
          </Link>

          <div className="login-content">

            <p>Tenha acesso a nossa editora</p>

            <form onSubmit={this.handleSubmit}>
              
              <label htmlFor="username">Usuário</label>
              <input 
                id="username" 
                type="text"
                required
                value={this.state.Username}
                onChange={event => this.setState({Username: event.target.value})}
              />
              
              <label htmlFor="password">Senha</label>
              <input 
                id="password" 
                type="password"
                required
                value={this.state.Password}
                onChange={event => this.setState({Password: event.target.value})}
              />
              
              <Link to="/" id="forgot">Esqueceu a senha?</Link>
              <button type="submit" onClick={() => this.handleSubmit()}>Entrar</button>
            </form>
            <p id="signup">Novo na Venatus? <Link to="/signup">Crie uma conta</Link></p>
          </div>
        </div>
      </div>
    );
  }
}
