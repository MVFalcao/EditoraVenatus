import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import api from '../../services/api';

import './styles.css';
import userAvatar from '../../assets/myAccount/silhueta.png';
import editAvatar from '../../assets/myAccount/lapis.svg';

export default class myAccount extends Component {

    state = {
        Name: '',
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
            <div className="main-content">
                <h2>Minha Conta</h2>
                <p>Visualize e edite suas informações pessoas.</p>
                <div className="line" />
                <div className="user-info">
                    <h3>Dados:</h3>
                    
                    <label htmlFor="name">Nome <span>*</span></label>
                    
                    <input 
                    type="text" 
                    id="name"
                    value={this.state.Name} 
                    onChange={e => this.setState({Name: e.target.value})}
                    />
                </div>
            </div>


        </div>
    );
  }
}
