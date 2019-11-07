import React, { Component } from 'react';
import api from '../../../services/api';

import Header from '../../../components/Header';
import AccountPages from '../../../components/AccountPages';
import UserInfo from '../../../components/UserInfo';

import './styles.css';
import userAvatar from '../../../assets/myAccount/silhueta.png';
import editAvatar from '../../../assets/myAccount/lapis.svg';

export default class myAccount extends Component {

    state = {
        Name: '',
        LastName: '',
        CPF: '',
        Telephone: '',
      }
    
      loadPerson = async e => {
        const response = await api.get('/api/Pessoa').catch(function (error) {
          console.log('Erro: ' + error.message);
        });
        if (response != null) {
          console.log(response);
        }
      }

      handlePageColor = (item = 0) => {
        let pageElement = document.querySelectorAll('.pages');
        let textElement = document.querySelectorAll('.pages a');

        pageElement[item].style.backgroundColor = '#FFF5B3';
        textElement[item].style.color = "#2F99AC";
      }

      componentDidMount() {
          this.handlePageColor(2);
      }

  render() {
    return (
        <>
        <Header />
        <div className="myaccount-container">
            
            <div className="left-info">

                <UserInfo />
                <AccountPages />

            </div>
            <div className="middle-content">
                <h2>Minha Conta</h2>
                <p>Visualize e edite suas informações pessoais.</p>
                <div className="line" />
                <div className="user-info">
                    <h3>Dados:</h3>
                    <form>
                    <ul>
                        <li>
                            <label htmlFor="name">Nome</label>
                            <input type="text" id="name"
                            value={this.state.Name} 
                            onChange={e => this.setState({Name: e.target.value})}
                            />
                        </li>
                        <li>
                            <label htmlFor="name">Sobrenome</label>
                            <input type="text" id="name"
                            value={this.state.LastName} 
                            onChange={e => this.setState({LastName: e.target.value})}
                            />
                        </li>
                        <li>
                            <label htmlFor="cpf">CPF</label>
                            <input type="text" id="cpf" readOnly
                            value={this.state.CPF}
                            onChange={e => this.setState({CPF: e.target.value})} 
                            />
                        </li>
                        <li>
                            <label htmlFor="telephone">Telefone</label>
                            <input type="text" id="telephone" readOnly
                            value={this.state.Telephone}
                            onChange={e => this.setState({Telephone: e.target.value})} 
                            />
                        </li>
                    </ul>
                    <button>Atualizar</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
  }
}
