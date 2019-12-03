import React, { Component } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

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

					</div>

				</div>
			
				<Footer />

			</>
		);
	}
}