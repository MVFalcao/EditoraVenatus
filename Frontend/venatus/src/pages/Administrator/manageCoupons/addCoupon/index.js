import React, { Component } from 'react';
import api from '../../../../services/api';
import Lottie from 'react-lottie';

import './styles.css';
import Dashboard from '../../../../components/Dashboard';
import OkAnimation from '../../../../assets/Animations/OkPopUp.json';
import ErrorAnimation from '../../../../assets/Animations/ErrorPopUp.json';

export default class addAuthor extends Component {

	state = {
		Name: "",
        DateIni: "",
        DateEnd: "",
        PagSeguroURL: "",
	
		isStopped: true,
	}

	handleSubmit = async event => {
        event.preventDefault();
        const jwt = localStorage.getItem("jwt");

        await api.get('api/Cupoms',  {
            headers: { "jwt": jwt },
			"Nome": this.state.Name,
            "Data_Ini": this.state.DateIni,
            "Data_Fim": this.state.DateEnd,
            "Botao_URL": this.state.PagSeguroURL,
            "Id_livro": 0,
            "Id_pessoa": 0,
		}).then(res => {
			console.log(res.data);

			this.setState({isStopped: false});
			this.showAnimationPopUp("success");
			setTimeout(() => {
				this.setState({isStopped: true});
			}, 3000);
		}).catch(error => {
			console.log('Submit -> ' + error);

			this.setState({isStopped: false});
			this.showAnimationPopUp("error");
			setTimeout(() => {
				this.setState({isStopped: true});
			}, 3000);
		});
	}

	//#region HandleAnimationPopUp() {
		showAnimationPopUp = (element="") => {
			document.querySelector(`.editPopUp.${element}`).style.display = "block";
		}
	  
		hideAnimationPopUp = (element="") => {
			document.querySelector(`.editPopUp.${element}`).style.display = "none";
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
			<div className="addCoupon-wrapper">

				<Dashboard />

				<div className="addCoupon-container">

					<h1>Cadastro de Cupom</h1>

					<div className="addCoupon-data">
				
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

                                    <label htmlFor="pagSeguro">Link do PagSeguro <span>*</span></label>
									<input 
										type="url" 
										id="pagSeguro"
										title="Link do botão do PagSeguro"
										placeholder="https://pag.ae/7US_QW_7Q/button"
										required
										value={this.state.PagSeguroURL} 
										onChange={e => this.setState({PagSeguroURL: e.target.value})}
									/>

								</li>

								<li>
									<label htmlFor="date-ini">Data Inicial <span>*</span></label>
									<input 
										type="date" 
										id="date-ini"
										required
										value={this.state.DateIni} 
										onChange={e => this.setState({DateIni: e.target.value})}
									/>
								</li>

								<li>
									<label htmlFor="date-fim">Data Final <span>*</span></label>
									<input 
										type="date" 
										id="date-fim"
										required
										value={this.state.DateEnd} 
										onChange={e => this.setState({DateEnd: e.target.value})}
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
              <h1>Cupom cadastrado com sucesso</h1>
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
