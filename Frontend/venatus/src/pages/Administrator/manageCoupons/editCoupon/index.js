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
    
        Coupon: [],

        isStopped: true,
    }
    
    loadCoupon = async () => {
        const jwt = localStorage.getItem("jwt");

		await api.get(`/api/Cupoms/${this.props.match.params.id}`, {
            headers: { "jwt": jwt }
        }).then(res => {
			console.log(res.data);
            this.setState({Coupon: res.data});
            this.loadCouponData();
		}).catch(error => {
			console.log('Coupon -> ' + error);
		});
    }
    
    loadCouponData = async () => {
        this.setState({Name: this.state.Coupon.Nome});
        this.setState({PagSeguroURL: this.state.Coupon.Botao_URL});
        this.handleDate();
    }

    handleDate = () => {
        const dataIni = this.state.Coupon.Data_Ini.split("T");
        const dataEnd = this.state.Coupon.Data_Fim.split("T");
		this.setState({DateIni: dataIni[0]});
        this.setState({DateEnd: dataEnd[0]});
	}

    componentDidMount() {
        this.loadCoupon();
    }

	handleSubmit = async event => {
        event.preventDefault();
        const jwt = localStorage.getItem("jwt");

        await api.put('api/Cupoms',  {
            headers: { "jwt": jwt },
            "ID_Cupom": this.state.Coupon.ID_Cumpom,
			"Nome": this.state.Name,
            "Data_Ini": this.state.DateIni,
            "Data_Fim": this.state.DateEnd,
            "Botao_URL": this.state.PagSeguroURL,
            "Id_livro": 0,
            "Id_pessoa": 0,
		}).then(res => {
			console.log(res.data);

			this.setState({isStopped: false});
			this.handleAnimationPopUp("success");
			setTimeout(() => {
				this.setState({isStopped: true});
			}, 3000);
		}).catch(error => {
			console.log('Submit -> ' + error);

			this.setState({isStopped: false});
			this.handleAnimationPopUp("error");
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
			<div className="editCoupon-wrapper">

				<Dashboard />

				<div className="editCoupon-container">

					<h1>Edição de Cupom</h1>

					<div className="editCoupon-data">
				
						<form onSubmit={this.handleSubmit}>

							<ul className="section item-1">

								<li>

									<label htmlFor="nome">Nome <span>*</span></label>
									<input 
										type="text" 
										id="nome"
                                        required
                                        style={{textTransform: 'uppercase'}}
										defaultValue={this.state.Name}
                                        onChange={e => this.setState({Name: e.target.value})}
                                        onFocus={e => e.target.select()}
									/>

                                    <label htmlFor="pagSeguro">Link do PagSeguro <span>*</span></label>
									<input 
										type="url" 
										id="pagSeguro"
										title="Link do botão do PagSeguro"
										placeholder="https://pag.ae/7US_QW_7Q/button"
										required
										defaultValue={this.state.PagSeguroURL} 
                                        onChange={e => this.setState({PagSeguroURL: e.target.value})}
                                        onFocus={e => e.target.select()}
									/>

								</li>

								<li>
									<label htmlFor="date-ini">Data Inicial <span>*</span></label>
									<input 
										type="date" 
										id="date-ini"
										required
										defaultValue={this.state.DateIni} 
										onChange={e => this.setState({DateIni: e.target.value})}
									/>
								</li>

								<li>
									<label htmlFor="date-fim">Data Final <span>*</span></label>
									<input 
										type="date" 
										id="date-fim"
										required
										defaultValue={this.state.DateEnd} 
										onChange={e => this.setState({DateEnd: e.target.value})}
									/>
								</li>

							</ul>

							<button type="submit">Atualizar</button>

						</form>
					</div>
				</div>

				<div className="editPopUp success">
					<Lottie options={okAnimationSettings}
						height={100}
						width={100}
						isStopped={this.state.isStopped}
					/>
             	 	<h1>Cupom cadastrado com sucesso</h1>
				</div>

				<div className="editPopUp error">
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
