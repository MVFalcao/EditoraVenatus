import React, { Component } from 'react';
import api from '../../../../services/api';
import Lottie from 'react-lottie';

import './styles.css';
import Dashboard from '../../../../components/Dashboard';
import OkAnimation from '../../../../assets/Animations/OkPopUp.json';
import ErrorAnimation from '../../../../assets/Animations/ErrorPopUp.json';

export default class addSell extends Component {

	state = {
		NomeCliente: "",
		ValorCompra: 1.00,
		DataCompra: "",

		isStopped: true,

		jwt: localStorage.getItem("jwt"),		
	}

	handleDashboardSize = () => {
		let elementSize = document.querySelector('.addSell-wrapper').offsetHeight;
		document.querySelector('.administrator-panel').style.minHeight = `${elementSize}px`;
	}

	
	componentDidMount() {
    	this.handleDashboardSize();
  	}


  	handleSubmit = async event => {
	event.preventDefault();
	const headersData = {
		'Content-Type': 'application/json',
		"jwt": this.state.jwt,
	}

    await api.post('api/Livros', {
		
		}, {
			headers: headersData,
		}).then(res => {
			console.log(res.data);
				
            this.setState({isStopped: false});
            this.handleAnimationPopUp("success");
            setTimeout(() => {
                this.setState({isStopped: true});
            }, 3000);
		}).catch(error => {
			console.log("Sell => " + error);

			this.setState({isStopped: false});
			this.handleAnimationPopUp("error");
			setTimeout(() => {
			  this.setState({isStopped: true});
			}, 3000);
		});
	}
	
	//#region HandleAnimation()
		showAnimationPopUp = (element="", message="Algo deu errado") => {
			document.querySelector(`.addPopUp.${element}`).style.display = "block";
			document.querySelector('.addPopUp.error h1').innerHTML = message;
		}
	
		hideAnimationPopUp = (element="") => {
			document.querySelector(`.addPopUp.${element}`).style.display = "none";
		}

		handleAnimationPopUp = (element = "") => {
			this.showAnimationPopUp(element);
			setTimeout(() => {
				this.hideAnimationPopUp(element);
			}, 3000);
		}
	//#endregion

  	render() {

		//#region AnimationSettins
			const okAnimationSettings = {
				loop: false,
				autoplay: false, 
				animationData: OkAnimation,
				rendererSettings: {
					preserveAspectRatio: 'xMidYMid slice'
				}
			};

			const errorAnimationSettings = {
				loop: false,
				autoplay: false, 
				animationData: ErrorAnimation,
				rendererSettings: {
					preserveAspectRatio: 'xMidYMid slice'
				}
			};
		//#endregion

    	return (

      	<div className="addSell-wrapper">

          	<Dashboard />

				<div className="addSell-container">

            		<h1>Cadastro de Venda</h1>

           		    <div className="addSell-data">
          
                        <form onSubmit={this.handleSubmit}>

                            <ul className="section item-1">

                                    <li>

                                        <label htmlFor="nomeCliente">Nome Cliente <span>*</span></label>
                                        <input 
                                            type="text" 
                                            id="nomeCliente"
                                            title="Nome de quem efetuou a compra"
                                            required
                                            value={this.state.Titulo} 
                                            onChange={e => this.setState({Titulo: e.target.value})}
                                        />

                                    </li>

                                    <li>

                                        <label htmlFor="valorCompra">Valor da Compra <span>*</span></label>
                                        <input 
                                            type="number"
                                            id="valorCompra"
                                            step=".01"
                                            min="1"
                                            required
                                            value={this.state.ValorCompra} 
                                            onChange={e => this.setState({ValorCompra: e.target.value})}
                                        />

                                    </li>

                                    <li>
                                    
                                        <label htmlFor="dataCompra">Data da Compra <span>*</span></label>
                                        <input 
                                            type="date" 
                                            id="dataCompra"
                                            required
                                            value={this.state.DataCompra} 
                                            onChange={e => this.setState({DataCompra: e.target.value})}
                                        />
                                        
                                    </li>

                                </ul>


                                <button type="submit">Cadastrar</button>

                        </form>

            	    </div>
			
				</div>


				<div className="addPopUp success">
					<Lottie options={okAnimationSettings}
						height={100}
						width={100}
						isStopped={this.state.isStopped}
					/>
              <h1>Nova compra adicionada com sucesso</h1>
				</div>

				<div className="addPopUp error">
					<Lottie options={errorAnimationSettings}
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
