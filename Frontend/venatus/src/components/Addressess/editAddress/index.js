import React, { Component } from 'react';
import api from '../../../services/api';

import './styles.css';
import Close from '../../../assets/myAccount/close.svg';

export default class newAddress extends Component {

    state = {
        Nome: '',
        CEP: '',
        Estado: '',
        Cidade: '',
        Logradouro: '',
        Bairro: '',
        Numero: '',
        Complemento: '',

        address: [],
        ID_Cliente: localStorage.getItem("ID_Cliente"),
        ID_Endereco: localStorage.getItem("ID_Endereco"),
        jwt: localStorage.getItem("jwt"),
    }

    loadAddress = async () => {
         await api.get(`api/GetEndereco?id=${this.state.ID_Endereco}`, {
            headers: {
                'Content-Type': 'application/json',
                "jwt": this.state.jwt,
            }
         }
         ).then(res => {
             this.setState({address: res.data});
             this.loadAddressData();
            console.log(res.data);
        }).catch(error => {
        console.log('Adressess Error: ' + error.message);
        });
    }

    loadAddressData = () => {
        this.setState({Nome: this.state.address[0].Nome_Proprietario});
        this.setState({CEP: this.state.address[0].CEP});
        this.setState({Estado: this.state.address[0].Estado});
        this.setState({Cidade: this.state.address[0].Cidade});
        this.setState({Logradouro: this.state.address[0].Logradouro});
        this.setState({Bairro: this.state.address[0].Bairro});
        this.setState({Numero: this.state.address[0].Numero});
        this.setState({Complemento: this.state.address[0].Complemento});
    }

    componentDidMount() {
        this.loadAddress();
    }

    handleSubmit = async event => {
        event.preventDefault();

        await api.put(`api/Enderecos/${this.state.ID_Endereco}`, {
            "ID_Endereco": this.state.ID_Endereco,
            "Nome_Proprietario": this.state.Nome,
            "CEP": this.state.CEP,
            "Estado": this.state.Estado,
            "Cidade": this.state.Cidade,
            "Logradouro": this.state.Logradouro,
            "Bairro": this.state.Bairro,
            "Numero": this.state.Numero,
            "Complemento": this.state.Complemento,
            "cliente": this.state.ID_Cliente,
        }, {
            headers: {
                'Content-Type': 'application/json',
                "jwt": this.state.jwt,
            }
        }).then(res => {
            console.log(res.data);
            window.location.reload();
        }).catch(error => {
            console.log(error.response);
            console.log("Error: " + error.message);
        });
    }

    render() {
        return (
            <div className="editAddress-container">

                <div className="editAddress-header">

                    <h1>Editar endereço</h1>

                    <button onClick={() => window.location.reload()}>
                        <img src={Close} alt=""/>
                    </button>

                </div>

                <div className="line" />

                <form onSubmit={this.handleSubmit}>

                    <ul>

                        <li className="name">
                            <label htmlFor="nome">Nome do Proprietário <span>*</span></label>
                            <input 
                                type="text" 
                                id="nome"
                                required
                                defaultValue={this.state.Nome} 
                                onChange={e => this.setState({Nome: e.target.value})}
                                onFocus={e => e.target.select()}
                            />
                        </li>

                        <li></li>

                        <li>
                            <label htmlFor="CEP">CEP <span>*</span></label>
                            <input 
                                type="text" 
                                id="CEP"
                                required
                                defaultValue={this.state.CEP} 
                                onChange={e => this.setState({CEP: e.target.value})}
                                onFocus={e => e.target.select()}
                            />
                        </li>

                        <li></li>

                        <li>
                            <label htmlFor="estado">Estado <span>*</span></label>
                            <input 
                                type="text"
                                id="estado"
                                required
                                defaultValue={this.state.Estado} 
                                onChange={e => this.setState({Estado: e.target.value})}
                                onFocus={e => e.target.select()}
                            />
                        </li>

                        <li>
                            <label htmlFor="cidade">Cidade <span>*</span></label>
                            <input 
                                type="text"
                                id="cidade"
                                required
                                defaultValue={this.state.Cidade} 
                                onChange={e => this.setState({Cidade: e.target.value})}
                                onFocus={e => e.target.select()}
                            />
                        </li>

                        <li>
                            <label htmlFor="logradouro">Rua / Avenida <span>*</span></label>
                            <input 
                                type="text"
                                id="logradouro"
                                required
                                defaultValue={this.state.Logradouro} 
                                onChange={e => this.setState({Logradouro: e.target.value})}
                                onFocus={e => e.target.select()}
                            />
                        </li>

                        <li>
                            <label htmlFor="bairro">Bairro <span>*</span></label>
                            <input 
                                type="text"
                                id="bairro"
                                required
                                defaultValue={this.state.Bairro} 
                                onChange={e => this.setState({Bairro: e.target.value})}
                                onFocus={e => e.target.select()}
                            />
                        </li>

                        <li>
                            <label htmlFor="numero">Número <span>*</span></label>
                            <input 
                                type="text"
                                id="numero"
                                required
                                defaultValue={this.state.Numero} 
                                onChange={e => this.setState({Numero: e.target.value})}
                                onFocus={e => e.target.select()}
                            />
                        </li>

                        <li>
                            <label htmlFor="complemento">Complemento <span>*</span></label>
                            <input 
                                type="text"
                                id="complemento"
                                required
                                defaultValue={this.state.Complemento} 
                                onChange={e => this.setState({Complemento: e.target.value})}
                                onFocus={e => e.target.select()}
                            />
                        </li>
                        
                    </ul>
            
                    <div className="line" />
                    
                    <button id="edit-addressBtn" type="submit">Atualizar Endereço</button>

                </form>

            </div>
    );
  }
}
