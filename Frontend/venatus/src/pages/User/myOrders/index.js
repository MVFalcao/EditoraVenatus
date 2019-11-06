import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import api from '../../../services/api';

import Header from '../../../components/Header';
import AccountPages from '../../../components/AccountPages';

import './styles.css';
import userAvatar from '../../../assets/myAccount/silhueta.png';
import editAvatar from '../../../assets/myAccount/lapis.svg';
import Close from '../../../assets/myAccount/close.svg';

export default class myOrders extends Component {

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
          this.handlePageColor(0);
      }


  render() {
    return (
        <>
        <Header />
        <div className="myorders-container">
            
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

                <h2>Meus Pedidos</h2>
                <p>Vizualize os dados e acompanhe os status dos seus pedidos</p>
                <div className="line" />

                <div className="orders-container">
                    <ul>
                        <li>
                            <p>PEDIDO: <span>#000001</span></p>
                            <Link to="">VER RESUMO</Link>
                        </li>
                    </ul>
                </div>
            </div>

        <div className="order-popup">
            <div className="order-container">
                <div className="order-header">
                    <div className="left-content">
                        <p>Pedido <span>#00001</span></p>
                        <p id="detail-paragraph">Detalhes da Compra</p>
                    </div>
                    <button>
                        <img src={Close} alt=""/>
                    </button>
                </div>
                <div className="line" />
            </div>
        </div>

        </div>
        </>
    );
  }
}
