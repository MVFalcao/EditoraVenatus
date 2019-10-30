import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import api from '../../services/api';

import Header from '../../components/Header';

import './styles.css';
import userAvatar from '../../assets/myAccount/silhueta.png';
import editAvatar from '../../assets/myAccount/lapis.svg';

export default class myAccount extends Component {

    state = {
        Name: '',
        LastName: '',
        CPF: '',
        Telephone: '',
      }
    
      handleApi = async e => {
        const response = await api.get('/api/Pessoa').catch(function (error) {
          console.log('Erro: ' + error.message);
        });
        if (response != null) {
          console.log(response);
        }
      } 


  render() {
    return (
        <>
        <Header />
        <div className="myaccount-container">
            
            <div className="left-content">

                <div className="user-content">
                    <img id="avatar" src={userAvatar} alt="Avatar do usuário"/>
                    {/* <button>
                        <img id="pencil" src={editAvatar} alt="Editar avatar"/>
                    </button> */}
                    <p>Jander Silva</p>
                </div>

                <div className="account-pages">
                    <ul>
                        <li className="pages item-1"><Link to="/">Meus Pedidos</Link></li>
                        <li className="pages item-2"><Link to="/">Meus Endereços</Link></li>
                        <li className="pages item-3"><Link to="/">Minha Conta</Link></li>
                    </ul>
                </div>
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
