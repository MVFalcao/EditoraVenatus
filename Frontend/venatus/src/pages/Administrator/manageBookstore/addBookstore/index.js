import React, { Component } from 'react';
import api from '../../../../services/api';
import Lottie from 'react-lottie';

import './styles.css';
import Dashboard from '../../../../components/Dashboard';
import OkAnimation from '../../../../assets/Animations/OkPopUp.json';

export default class addBook extends Component {

    state = {
      Nome: "",
      CNPJ: "",
      TipoConsignacao: "consignado",

      Costumer: 0,
      isStopped: true,
    }

  deleteCostumer = async () => {
    let jwt = localStorage.getItem("jwt");
    const responseCliente = await api.delete(`/api/Clientes/${this.state.Costumer}`, {
      headers: {
			'Content-Type': 'application/json',
			"jwt": jwt,
		},
    }).catch(function(error) {
      console.log('Error -> DeleteCostumer: ' + error.message);
    });
      if (responseCliente != null) {
        console.log('Erro na criação da Livraria, Cliente apagado');
      }
  }  

  	handleSubmit = async event => {
		event.preventDefault();
		let jwt = localStorage.getItem("jwt");
		const headersData = {
			'Content-Type': 'application/json',
			"jwt": jwt,
		}

		await api.post('/api/Clientes', {

		}, { 
			headers: headersData,
		}).then(res => {
			console.log(res.data);
			this.setState({Costumer: res.data.ID_Cliente});
		}).catch(error => {
			console.log("Costumer -> " + error);
		});

		await api.post('/api/Livrarias', {
			"Nome": this.state.Nome,
			"CNPJ": this.state.CNPJ,
			"Tipo_Consignacao": this.state.TipoConsignacao,
			"cliente": this.state.Costumer,
		}, {
			headers: headersData,
		}).then(res => {
			console.log(res.data);

			this.setState({isStopped: false});
			this.handlePopUp();
			setTimeout(() => {
				this.setState({isStopped: true});
			}, 3000);
		}).catch(error => {
			console.log("Bookstore -> " + error);
			this.deleteCostumer();
		});
	}

  //#region HandlePopUp() {
    showPopUp = () => {
      document.querySelector('.addPopUp').style.display = "block";
  }
  
  hidePopUp = () => {
    document.querySelector('.addPopUp').style.display = "none";
  }

  handlePopUp = () => {
    this.showPopUp();
    setTimeout(() => {
      this.hidePopUp();
    }, 3000);
  }
  //#endregion

  render() {

    const defaultOptions = {
      loop: false,
      autoplay: false, 
      animationData: OkAnimation,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    return (
      <div className="addBookstore-wrapper">

          <Dashboard />

          <div className="addBookstore-container">

            <h1>Cadastro de Livraria</h1>

            <div className="addBookstore-data">
          
              <form onSubmit={this.handleSubmit}>
                <ul className="section item-1">

                  <li>
                    <label htmlFor="nome">Nome <span>*</span></label>
                    <input 
                      type="text" 
                      id="nome"
                      required
                      value={this.state.Nome} 
                      onChange={e => this.setState({Nome: e.target.value})}
                    />
                  </li>

                  <li>
                    <label htmlFor="CNPJ">CNPJ <span>*</span></label>
                    <input 
                      type="text" 
                      id="CNPJ"
                      required
                      value={this.state.CNPJ} 
                      onChange={e => this.setState({CNPJ: e.target.value})}
                    />
                  </li>

                  <li>
                  <label>Tipo Consignação <span>*</span></label>
                    <select value={this.state.TipoConsignacao} onChange={e => this.setState({TipoConsignacao: e.target.value})}>
                      <option value="consignado">Consignado</option>
                      <option value="naoconsignado">Não Consignado</option>
                    </select>
                  </li>

                </ul>

                <button type="submit">Cadastrar</button>

              </form>
            </div>
          </div>

          <div className="addPopUp">
              <Lottie options={defaultOptions}
                height={100}
                width={100}
                isStopped={this.state.isStopped}
              />
              <h1>Livraria adicionada com sucesso</h1>
            </div>
      </div>
    );
  }
}
