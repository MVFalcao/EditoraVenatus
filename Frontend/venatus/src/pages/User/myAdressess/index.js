import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import api from '../../../services/api';

import Header from '../../../components/Header';
import AccountPages from '../../../components/AccountPages';

import './styles.css';
import userAvatar from '../../../assets/myAccount/silhueta.png';
import editAvatar from '../../../assets/myAccount/lapis.svg';

export default class myAdressess extends Component {

    state = {
        allAdressess: [],
        Person: [],
    }
    
    loadAdressess = async e => {
        const response = await api.get('/api/Enderecos').catch(function (error) {
        console.log('Erro: ' + error.message);
    });
        if (response != null) {
            console.log(response);
            this.setState({allAdressess: response.data})
        }
    }

    loadPerson = async e => {
        const response = await api.get('/api/Pessoas').catch(function (error) {
            console.log('Erro: ' + error.message);
        });
        if (response != null) {
            console.log(response);
            this.setState({allAdressess: response.data})
        }
    }

    handlePageColor = (item = 0) => {
        let pageElement = document.querySelectorAll('.pages');
        let textElement = document.querySelectorAll('.pages a')
        
        pageElement[item].style.backgroundColor = '#FFF5B3';
        textElement[item].style.color = "#2F99AC";
      }

      componentDidMount() {
          this.handlePageColor(1);
      }


  render() {
    return (
        <>
        <Header />
        <div className="myaccount-container">
            
            <div className="left-info">

                <div className="user-content">
                    <img id="avatar" src={userAvatar} alt="Avatar do usuário"/>
                    {/* <button>
                        <img id="pencil" src={editAvatar} alt="Editar avatar"/>
                    </button> */}
                    <p>Jander Silva</p>
                </div>

                <AccountPages />
               
            </div>
            <div className="middle-content">

                <h2>Meus Endereços</h2>
                <p>Adicione e edite os endereços de envio dos produtos.</p>
                <div className="line" />

                <div className="adress-container">
                    <ul>
                        <li>Jander Silva</li>
                        <li>Av. Bernardinho de Campos, Paralela, 98</li>
                        <li>42030-000, Apt 506</li>
                        <li>Salvador</li>
                    </ul>
                </div>

                <div className="adressess-buttons">

                    <Link to="/">Editar</Link>
                    <Link className="deleteBtn" to="/">Apagar</Link>
                    <button>Tornar este endereço padrão</button>
                
                </div>

                <div className="line light" />
            </div>
        </div>
        </>
    );
  }
}
