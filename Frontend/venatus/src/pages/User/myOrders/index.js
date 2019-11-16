import React, { Component } from 'react';
import api from '../../../services/api';

import Header from '../../../components/Header';
import AccountPages from '../../../components/AccountPages';
import UserInfo from '../../../components/UserInfo';

import './styles.css';
import Close from '../../../assets/myAccount/close.svg';

export default class myOrders extends Component {

    state = {
        allAdressess: [],
        Person: [],
    }
    
    loadAdressess = async () => {
        const response = await api.get('/api/Enderecos').catch(function (error) {
        console.log('Erro: ' + error.message);
    });
        if (response != null) {
            console.log(response);
            this.setState({allAdressess: response.data})
        }
    }

    loadPerson = async () => {
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

    //#region HandleDiv() {
        showPopUp = () => {
            document.querySelector('.order-popup').style.display = "block";
        }
        
        hidePopUp = () => {
            document.querySelector('.order-popup').style.display = "none";
        }

        hidePopUpbyDiv = (e) => {
            if (document.querySelector('.order-container').contains(e.target)) {
                return
            } else {
                document.querySelector('.order-popup').style.display = "none";
            }
        }
    //#endregion


  render() {
    return (
        <>
        <Header />
        <div className="myorders-container">
            
            <div className="left-info">

                <UserInfo />
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
                            <button onClick={this.showPopUp}>VER RESUMO</button>
                        </li>
                    </ul>
                </div>
            </div>

        <div className="order-popup" onClick={this.hidePopUpbyDiv}>

            <div className="order-container">

                <div className="order-header">

                    <div className="left-content">

                        <p>Pedido <span>#00001</span></p>
                        <p id="detail-paragraph">Detalhes da Compra</p>
                   
                    </div>
                    <button onClick={() => this.hidePopUp()}>
                        <img src={Close} alt=""/>
                    </button>

                </div>

                <div className="line" />

                <h2>Informações do Pedido</h2>
                <div className="order info">

                    <ul>

                        <li>Data do Pedido: 06/11/2019</li>
                        <li>Forma de Pagamento: Cartão de Crédito</li>
                        <li>Status do Pedido: Pedido Concluído</li>

                    </ul>

                </div>
                
                <h2>Dados da Entrega</h2>
                <div className="order ship">
                    <div className="left-content">
                        <ul>
                            <li>Jander Silva</li>
                            <li>Av.Bernardinho de Campos, Paralela, 98</li>
                            <li>42030-000, Apt 506</li>
                            <li>Salvador</li>
                        </ul>
                    </div>
                    <div className="right-content">
                        <ul>
                            <li>
                                <p>Sedex</p>
                            </li>
                            <li id="ship-code">
                                <p>1HG673818XN2</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <h2>Produto</h2>
                <div className="order product">
                    <div className="left-content">
                        <ul>
                            <li><img src="https://ericafalcaoescritora.files.wordpress.com/2018/03/leuriblog.jpg?w=226&zoom=2" alt="Livro"/></li>
                            <li>
                                <p>Livro Leurianto - Dimensão Game</p>
                                <p>Quantidade: 1</p>    
                            </li>
                        </ul>
                    </div>
                    <div className="right-content">
                        <ul>
                            <li>
                                <p>Total</p>
                            </li>
                            <li id="product-price">
                                <p>R$ 39,90</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <h2>Valor da Compra</h2>
                <div className="order cost">
                    <ul>
                        <li>
                            <p>Produto:</p>
                            <p>R$ 39,90</p>
                        </li>
                        <div className="line cost" />
                        <li>
                            <p>Frete:</p>
                            <p>R$ 20,00</p>
                        </li>
                        <div className="line cost" />
                        <li>
                            <p>Desconto:</p>
                            <p>R$ 5,00</p>
                        </li>
                    </ul>

                </div>
                
                <section>
                    <p>Total:</p>
                    <p>R$ 64,90</p>
                </section>

            </div>
        </div>

        </div>
        </>
    );
  }
}
