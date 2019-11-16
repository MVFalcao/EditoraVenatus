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

        adress: [],
    }

    handleSubmit = async event => {
        event.preventDefault();

        await api.put('api/Enderecos', {
            "Nome": this.state.Nome,
            "CEP": this.state.CEP,
            "Estado": this.state.Estado,
            "Cidade": this.state.Cidade,
            "Logradouro": this.state.Logradouro,
            "Bairro": this.state.Bairro,
            "Numero": this.state.Numero,
            "Complemento": this.state.Complemento,
        }).then(res => {
            console.log(res.data);
        }).catch(error => {
            console.log(error.response);
            console.log("Error: " + error.message);
        });
    }

    render() {
        return (
            <div className="address-container">

                <div className="address-header">

                    <h1>Editar o endereço</h1>

                    <button onClick={() => window.location.reload()}>
                        <img src={Close} alt=""/>
                    </button>

                </div>

                <div className="line" />

                <form>

                    <ul>

                        <li className="name">
                            <label htmlFor="nome">Nome do Proprietário <span>*</span></label>
                            <input 
                                type="text" 
                                id="nome"
                                required
                                value={this.state.Nome} 
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
                                value={this.state.CEP} 
                                onChange={e => this.setState({CEP: e.target.value})}
                            />
                        </li>

                        <li></li>

                        <li>
                            <label htmlFor="estado">Estado <span>*</span></label>
                            <input 
                                type="text"
                                id="estado"
                                required
                                value={this.state.Estado} 
                                onChange={e => this.setState({Estado: e.target.value})}
                            />
                        </li>

                        <li>
                            <label htmlFor="cidade">Cidade <span>*</span></label>
                            <input 
                                type="text"
                                id="cidade"
                                required
                                value={this.state.Cidade} 
                                onChange={e => this.setState({Cidade: e.target.value})}
                            />
                        </li>

                        <li>
                            <label htmlFor="logradouro">Rua / Avenida <span>*</span></label>
                            <input 
                                type="text"
                                id="logradouro"
                                required
                                value={this.state.Logradouro} 
                                onChange={e => this.setState({Logradouro: e.target.value})}
                            />
                        </li>

                        <li>
                            <label htmlFor="bairro">Bairro <span>*</span></label>
                            <input 
                                type="text"
                                id="bairro"
                                required
                                value={this.state.Bairro} 
                                onChange={e => this.setState({Bairro: e.target.value})}
                            />
                        </li>

                        <li>
                            <label htmlFor="numero">Número <span>*</span></label>
                            <input 
                                type="text"
                                id="numero"
                                required
                                value={this.state.Numero} 
                                onChange={e => this.setState({Numero: e.target.value})}
                            />
                        </li>

                        <li>
                            <label htmlFor="complemento">Complemento <span>*</span></label>
                            <input 
                                type="text"
                                id="complemento"
                                required
                                value={this.state.Complemento} 
                                onChange={e => this.setState({Complemento: e.target.value})}
                            />
                        </li>
                        
                    </ul>

                </form>
            
                <div className="line" />
                
                <div className="addressess-buttons">
                    <button>Atualizar</button>
                    <button id="cancel" onClick={() => window.location.reload()}>Cancelar</button>
                </div>

            </div>
    );
  }
}
