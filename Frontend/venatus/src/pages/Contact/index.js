import React, { Component } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './styles.css';

export default class Contact extends Component {

	render() {
		return (
			<>
				<Header />
				
				<div className="contact-container">
					
					<div className="contact-background">

						<h1>Contate nossa Editora</h1>
						<h2>Dúvidas ou Parcerias? Sinta-se livre para nos enviar uma mensagem</h2>
						<p>EditoraVenatus@gmail.com</p>

					</div>

				</div>
			
				<Footer />

			</>
		);
	}
}