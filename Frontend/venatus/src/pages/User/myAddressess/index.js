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

        jwt: localStorage.getItem("jwt"),
    }
    
    loadAdressess = async () => {
        await api.get(`api/GetClienteEndereco?id=${this.state.ID_Cliente}`, {
            headers: {
                'Content-Type': 'application/json',
                "jwt": this.state.jwt,
            }
        }).then(res => {
            this.setState({allAdressess: res.data});

            console.log(res.data);
        }).catch(error => {
            console.log('loadAdressess -> ' + error);
        });
    }
    
    componentDidMount() {
        this.handlePageColor(1);
        this.loadAdressess();
    }

    deleteAddress = async (ID_Endereco = 0) => {
        await api.delete(`api/Enderecos/${ID_Endereco}`, {
            headers: {
                'Content-Type': 'application/json',
                "jwt": this.state.jwt,
            }
        }).then(res => {
            console.log(res.data);
            this.loadAdressess();
        }).catch(error => {
            console.log('Delete Error: ' + error.message);
        });
    }

    handleDeleteAddress = (ID_Endereco = 0) => {
        let confirmDelete = window.confirm(`Deseja realmente deletar este endereço?`);
        if (confirmDelete) this.deleteAddress(ID_Endereco);
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
    
    handleEditPopUp = (ID_Endereco = 0) => {
        console.log(ID_Endereco);
        const popUpElement = document.querySelector('.address-popup.i2');
        localStorage.setItem("ID_Endereco", ID_Endereco);
        
        
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
    
    const noAddressStyle = {
        margin: '140px 20px 0px',
    }

    const addAddressBtnStyle = {
        margin: '40px 150px 0px'
    }

    
    return (

        <>

            <Header />

            <div className="myaccount-container">
                
                <div className="left-info">
                    <UserInfo />
                    <AccountPages />
                </div>

                <div className="middle-content">

                    {this.state.allAdressess.length === 0 ? 
                        <div className="no-address" style={noAddressStyle}>
                            <p>Você não possui nenhum endereço cadastrado <span role="img" aria-label="Sad">😥</span></p>
                        </div> 
                    : 
                    //#region withAddress

                    <>
                        <h2>Meus Endereços</h2>

                        <p>Adicione e edite os endereços de envio dos produtos.</p>

                        <div className="line" />

                            <ul>

                            {this.state.allAdressess.map( address => (

                                <li key={address.ID_Endereco}>

                                    <div className="adress-container">

                                        <ul>

                                            <li>{address.Nome_Proprietario}</li>
                                            <li>{address.Logradouro}, {address.Bairro}, {address.Numero}</li>
                                            <li>{address.CEP}, {address.Complemento}</li>
                                            <li>{address.Cidade}</li>

                                        </ul>

                                    </div>

                                    <div className="adressess-buttons">

                                        <button onClick={() => this.handleEditPopUp(address.ID_Endereco)}>Editar</button>
                                        <button className="deleteBtn" onClick={() => this.handleDeleteAddress(address.ID_Endereco)}>Apagar</button>
                                        {/* <button>Tornar este endereço padrão</button> */}
                                    
                                    </div>

                                    <div className="line light" style={{backgroundColor: 'rgb(150, 150, 150)'}}/>

                                </li>
                            
                            ))}

                            </ul>
                        </>

                        //#endregion
                    }

                    <button id="add-addressBtn" 
                        style={this.state.allAdressess.length === 0 ? addAddressBtnStyle : {}} 
                        onClick={() => this.handleAddPopUp()}
                    >Adicionar novo endereço</button>

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
