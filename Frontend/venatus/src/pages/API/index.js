import React, { Component } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import Insomnia from '../../assets/main/CasosDeTeste.jpg';

import './styles.css';

export default class Contact extends Component {

	render() {
		return (
			<>
				<Header />
				
				<div className="API-container">
					
					<div className="API-background">

						<h1>Utilize de nossa API </h1>
						<h2>Divulgue nossos livros em seu site</h2>

						<img src={ Insomnia } alt="Insomnia"/>

						<h2>Faça o download dos modelos das rotas</h2>

						<a href="https://drive.google.com/open?id=1ZH_4b7jsW0dV2GxqO8IrxCU6EFGw4arl" target="_blank" rel="noopener noreferrer">Download Insomnia JSON</a>

					</div>

				</div>
			
				<Footer />

			</>
		);
	}
}