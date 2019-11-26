import React, { Component } from 'react';
import api from '../../../../services/api';
import Lottie from 'react-lottie';

import './styles.css';
import Dashboard from '../../../../components/Dashboard';
import OkAnimation from '../../../../assets/Animations/OkPopUp.json';

export default class manageAuthor extends Component {

	state = {
		Nome: "",
		CPF: "",
	
		isStopped: true,
	}

	handleSubmit = async event => {
		event.preventDefault();

		await api.post('api/Autors', {
			"Nome": this.state.Nome,
			"CPF": this.state.CPF,
		}).then(res => {
			console.log(res.data);

			this.setState({isStopped: false});
			this.handlePopUp();
			setTimeout(() => {
					this.setState({isStopped: true});
			}, 3000);
		}).catch(error => {
			console.log('Error -> ' + error);
		});
	}

	//#region HandleAnimationPopUp() {
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
			<div className="addAuthor-wrapper">

				<Dashboard />

				<div className="addAuthor-container">

					<h1>Cadastro de Autor</h1>

					<div className="addAuthor-data">
				
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
									<label htmlFor="CPF">CPF <span>*</span></label>
									<input 
										type="text" 
										id="CPF"
										required
										value={this.state.CPF} 
										onChange={e => this.setState({CPF: e.target.value})}
									/>
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
				<h1>Autor adicionado com sucesso</h1>
			</div>
		</div>
    );
  }
}
