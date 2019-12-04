import React, { Component } from 'react';
import api from '../../../../services/api';
import Lottie from 'react-lottie';

import './styles.css';
import Dashboard from '../../../../components/Dashboard';
import OkAnimation from '../../../../assets/Animations/OkPopUp.json';
import ErrorAnimation from '../../../../assets/Animations/ErrorPopUp.json';

export default class editBookstore extends Component {

  state = {
    Nome: "",
    CNPJ: "",
    TipoConsignacao: "",

    Bookstore: [],
    isStopped: true,

    "jwt": localStorage.getItem("jwt"),
  }
  
	async loadBookstore() {
		await api.get(`/api/Livrarias/${this.props.match.params.id}`, {
			headers: {
			'Content-Type': 'application/json',
			"jwt": this.state.jwt,
		}
		}).then(res => {
			console.log(res.data);
			this.setState({Bookstore: res.data})
			this.loadBookstoreData();
		}).catch(error => {
			console.log('loadBookstore ' + error);
		});
	}
    
	loadBookstoreData = () => {
		this.setState({Nome: this.state.Bookstore.Nome});
		this.setState({CNPJ: this.state.Bookstore.CNPJ});
		this.setState({TipoConsignacao: this.state.Bookstore.Tipo_Consignacao});
	}

	componentDidMount() {
		this.loadBookstore();
	}

	handleSubmit = async event => {
		event.preventDefault();

		await api.put(`api/Livrarias/${this.props.match.params.id}`, {
			"ID_Livraria": this.state.Bookstore.ID_Livraria,
			"Nome": this.state.Nome,
			"CNPJ": this.state.CNPJ,
			"Tipo_Consignacao": this.state.TipoConsignacao,
			"Cliente": this.state.Bookstore.Cliente,
		}, {
			headers: {
			'Content-Type': 'application/json',
			"jwt": this.state.jwt,
			}
		}).then(res => {
			this.setState({isStopped: false});
			this.handlePopUp("success");
			setTimeout(() => {
			this.setState({isStopped: true});
			}, 3000);
		}).catch(error => {
			console.log("Error: " + error.message);
			
			this.setState({isStopped: false});
			this.handlePopUp("error");
			setTimeout(() => {
			this.setState({isStopped: true});
			}, 3000);
		});
		}	

  showPopUp = (element="") => {
    document.querySelector(`.editPopUp.${element}`).style.display = "block";
  }
  
  hidePopUp = (element="") => {
    document.querySelector(`.editPopUp.${element}`).style.display = "none";
  }

  handlePopUp = (element = "") => {
    this.showPopUp(element);
    setTimeout(() => {
      this.hidePopUp(element);
    }, 3000);
  }

  render() {

    const okAnimation = {
      loop: false,
      autoplay: false, 
      animationData: OkAnimation,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    const errorAnimation = {
      loop: false,
      autoplay: false, 
      animationData: ErrorAnimation,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    return (
      <div className="editBookstore-wrapper">

          <Dashboard />

          <div className="editBookstore-container">

            <h1>Edição de Livraria</h1>

            <div className="editBookstore-data">
          
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
                      onFocus={e => e.target.select()}
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
                      onFocus={e => e.target.select()}
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

                <button type="submit">Atualizar</button>

              </form>
            </div>
          </div>

          <div className="editPopUp success">
              <Lottie options={okAnimation}
                height={100}
                width={100}
                isStopped={this.state.isStopped}
              />
              <h1>Livraria editada com sucesso</h1>
          </div>

          <div className="editPopUp error">
              <Lottie options={errorAnimation}
                height={100}
                width={100}
                isStopped={this.state.isStopped}
              />
              <h1>Algo deu errado</h1>
          </div>

      </div>
    );
  }
}