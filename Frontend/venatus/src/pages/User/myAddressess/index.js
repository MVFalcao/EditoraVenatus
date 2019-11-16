import React, { Component } from 'react';
import api from '../../../services/api';

import Header from '../../../components/Header';
import AccountPages from '../../../components/AccountPages';
import UserInfo from '../../../components/UserInfo';
import NewAddress from '../../../components/Addressess/newAddress';
import EditAddress from '../../../components/Addressess/editAddress';

import './styles.css';

export default class myAdressess extends Component {

    state = {
        allAdressess: [],
        person: [],
        ID_Cliente: localStorage.getItem("ID_Cliente"),

        addIsClosed: true,
        editIsClosed: true,
    }
    
    loadAdressess = async () => {
        await api.get(`api/GetClienteEndereco?id=${this.state.ID_Cliente}`).then(res => {
            this.setState({allAdressess: res.data});

            console.log(res.data);
        }).catch(error => {
        console.log('Adressess Error: ' + error.message);
        });
    }
    
    componentDidMount() {
        this.handlePageColor(1);
        this.loadAdressess();
    }

    deleteAddress = async (ID_Endereco = 0) => {
        await api.delete(`api/Enderecos/${ID_Endereco}`).then(res => {
            console.log(res.data);
        }).catch(error => {
            console.log('Delete Error: ' + error.message);
        });
    }

    handleDeleteAddress = (ID_Endereco = 0) => {
        let confirmDelete = window.confirm(`Deseja realmente deletar este endereço?`);
        if (confirmDelete) this.deleteBook(ID_Endereco);
        else return;
      }
    
    handlePageColor = (item = 0) => {
        let pageElement = document.querySelectorAll('.pages');
        let textElement = document.querySelectorAll('.pages a')
        
        pageElement[item].style.backgroundColor = '#FFF5B3';
        textElement[item].style.color = "#2F99AC";
    }
    
    handleAddPopUp = () => {
        const popUpElement = document.querySelector('.address-popup');
        
        const showPopUp = () => {
            popUpElement.style.display = "block";
            this.setState({addIsClosed: false});
        }
        const hidePopUp = () => {
            popUpElement.style.display = "none";
            this.setState({addIsClosed: true});
        }

        if (this.state.addIsClosed) {
            showPopUp();
        } else {
            hidePopUp();
        }
    }
    
    handleEditPopUp = () => {
        const popUpElement = document.querySelector('.address-popup.i2');
        
        const showPopUp = () => {
            popUpElement.style.display = "block";
            this.setState({editIsClosed: false});
        }
        const hidePopUp = () => {
            popUpElement.style.display = "none";
            this.setState({editIsClosed: true});
        }

        if (this.state.editIsClosed) {
            showPopUp();
        } else {
            hidePopUp();
        }
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

                    <h2>Meus Endereços</h2>

                    <p>Adicione e edite os endereços de envio dos produtos.</p>

                    <div className="line" />

                        <ul>

                        {/* {this.state.allAdressess.map((address) => ( */}

                            <li>

                                <div className="adress-container">

                                    <ul>

                                        <li>Jander Silva</li>
                                        <li>Av. Bernardinho de Campos, {this.state.allAdressess.Bairro}, 98</li>
                                        <li>{this.state.allAdressess.CEP}, {this.state.allAdressess.Complemento}</li>
                                        <li>{this.state.allAdressess.Cidade}</li>

                                    </ul>

                                </div>

                                <div className="adressess-buttons">

                                    <button onClick={() => this.handleEditPopUp()}>Editar</button>
                                    <button className="deleteBtn" onClick={() => this.handleDeleteAddress()}>Apagar</button>
                                    {/* <button>Tornar este endereço padrão</button> */}
                                
                                </div>

                                <div className="line light" style={{backgroundColor: 'background-color: rgb(150, 150, 150)'}}/>

                            </li>
                        
                        {/* ))} */}

                        </ul>

                        <button id="add-addressBtn" onClick={() => this.handleAddPopUp()}>Adicionar novo endereço</button>

                </div>

            </div>

            <div className="address-popup" onClick={() => this.handleAddPopUp()} />
            <div className="address-popup i2" onClick={() => this.handleEditPopUp()} />
            {this.state.addIsClosed ? <></> : <NewAddress />}
            {this.state.editIsClosed ? <></> : <EditAddress />}
        </>
    );
  }
}
