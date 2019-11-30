import React, { Component } from 'react';
import api from '../../../../services/api';
import Lottie from 'react-lottie';

import Dashboard from '../../../../components/Dashboard';

import './styles.css';
import OkAnimation from '../../../../assets/Animations/OkPopUp.json';
import ErrorAnimation from '../../../../assets/Animations/ErrorPopUp.json';
import Cupom from '../../../../assets/administrator/cupom.svg';

export default class editBook extends Component {

	state = {
		allCoupons: [],

		isStopped: true,
	}

	async loadCoupon() {
		await api.get('/api/Cupoms').then(res => {
			console.log(res.data);
			this.setState({allCoupons: res.data});
		}).catch(error => {
			console.log('Coupon -> ' + error);
		});
	}

	async deleteCoupon(ID_Coupon = 0) {
		const jwt = localStorage.getItem("jwt");

		await api.delete(`/api/Cupoms/${ID_Coupon}`, {
			headers: {"jwt": jwt}
		}).then(res => {
			console.log(res);

			this.setState({isStopped: false});
			this.handleAnimationPopUp("success");
			this.loadCoupon();
			setTimeout(() => {
				this.setState({isStopped: true});
			}, 3000);
		}).catch(error => {
			console.log('deleteCoupon -> ' + error);
			  
			this.setState({isStopped: false});
			this.handleAnimationPopUp("error");
			setTimeout(() => {
				this.setState({isStopped: true});
			}, 3000);
		});
	}
	
	handleDeleteCoupon = (ID_Cupom = 0, index = 0) => {
		let confirmDelete = window.confirm(`Deseja realmente deletar o cupom ${this.state.allCoupons[index].Nome}?`);
		if (confirmDelete) this.deleteCoupon(ID_Cupom);
		else return;
	}

	componentDidMount() {
		this.loadCoupon();
	}

	//#region HandleAnimationPopUp() {
		showAnimationPopUp = (element="") => {
			document.querySelector(`.deletePopUp.${element}`).style.display = "block";
		}
	  
		hideAnimationPopUp = (element="") => {
			document.querySelector(`.deletePopUp.${element}`).style.display = "none";
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

			<div className="selectCoupon-wrapper">

				<Dashboard />

				<div className="selectCoupon-container">

					<h1>Selecione o cupom a ser deletado</h1>

					<ul>

					{this.state.allCoupons.map((coupon, index) => (

						<li key={coupon.ID_Cupom}>

							<button onClick={() => this.handleDeleteCoupon(coupon.ID_Cupom, index)}>
								<img src={Cupom} alt={coupon.Nome}/>
								<h2>{coupon.Nome}</h2>
							</button>

						</li>

					))}

					</ul>

				</div>

				<div className="deletePopUp success">
					<Lottie options={okAnimationSettings}
						height={100}
						width={100}
						isStopped={this.state.isStopped}
					/>
             	 	<h1>Cupom deletado com sucesso</h1>
				</div>

				<div className="deletePopUp error">
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
