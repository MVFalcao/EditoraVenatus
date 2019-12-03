import React, { Component } from 'react';
import api from '../../services/api';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './styles.css';
import faixa_azul from '../../assets/main/faixa_azul.svg';
import Erica from '../../assets/workers/Erica.jpg'

export default class AboutUs extends Component {

	state = {
		Authors: [],
	}

	loadAuthors = async () => {
		await api.get('api/Autors').then(res => {
			console.log(res.data);

			let sliceAuthors = res.data.slice(0, 1);
			this.setState({Authors: sliceAuthors});
		}).catch(error => {
			console.log('loadAuthors => ' + error);
		})
	}

	componentDidMount() {
		this.loadAuthors();
	}

	render() {
		return (
			<>
				<Header />
				
				<div className="aboutUs-container">

					<h1>Sobre nossa Editora</h1>

					<div className="aboutUs-background">
				
						<div className="venatus-workers">

							<ul>
								{this.state.Authors.map((author, index) => (
										<li key={author.ID_Autor}>
											<div className="image-container">
												<img id="author" src={Erica} alt="Autora Erica"></img>
												<img id="faixa" src={faixa_azul} alt="faixa"/>
											</div>
											<h1>{author.Nome}, Autora</h1>
											<p>Érica Falcão, natural de Petrópolis - RJ, atual residente de Lauro de Freitas - BA. É Pedagoga, especializada em Tecnologia Educacional. Autora de obras de literatura Infantojuvenil desde 2014.</p>

										</li>
								))}
							</ul>

						</div>
					</div>

				</div>
			
				<Footer />

			</>
		);
	}
}