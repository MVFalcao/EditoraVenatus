import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../../../services/api';

import Dashboard from '../../../../../components/Dashboard';

import './styles.css';
import Cupom from '../../../../../assets/administrator/cupom.svg';

export default class editBook extends Component {

	state = {
		allCoupons: [],
	}

	async loadCoupon() {
		await api.get('/api/Cupoms').then(res => {
			console.log(res.data);
			this.setState({allCoupons: res.data});
		}).catch(error => {
			console.log('Coupon -> ' + error);
		});
	}

	componentDidMount() {
		this.loadCoupon();
	}

	render() {
		return (

			<div className="selectCoupon-wrapper">

				<Dashboard />

				<div className="selectCoupon-container">

					<h1>Selecione o cupom a ser editado</h1>

					<ul>

					{this.state.allCoupons.map(coupon => (

						<li key={coupon.ID_Cupom}>

							<Link to={`/administrator/editcoupon/${coupon.ID_Cupom}`}>
								<img src={Cupom} alt={coupon.Nome}/>
								<h2>{coupon.Nome}</h2>
							</Link>

						</li>

					))}

					</ul>

				</div>

			</div>
		);
	}
}
