import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './styles.css';
import faixa_azul from '../../assets/main/faixa_azul.svg';

export default class main extends Component {

	state = {
		allRealeaseBooks: [],
	}

	loadReleaseBooks = async () => {
		await api.get('/api/Livros/Lancamento').then(res => {
			console.log(res.data);
			
			let sliceBooks = res.data.slice(0, 4);			
			this.setState({allRealeaseBooks: sliceBooks});
		}).catch(error => {
			console.log('Books -> ' + error);
		});
	}

	componentDidMount() {
		this.loadReleaseBooks();
	}

	render() {
		return (
			<>
				<Header />
				
				<div className="main-container">

					<h1>Lançamentos</h1>

					<div className="main-background">

						<section className="main-content">

							<ul>
								{this.state.allRealeaseBooks.map(book => (
									<li key={book.ID_Livro}>
										<Link to={`/bookPage/${book.ID_Livro}`}>
											<img src={book.Imagem_URL} alt="" />
										</Link>
										<h2>{book.Titulo} {book.SubTitulo}</h2>
										<p>R$ {parseFloat(book.Preco).toFixed(2)}</p>
										<Link to={`/bookPage/${book.ID_Livro}`} id="BookBtn">Saiba mais</Link>
									</li>
								))}
								
							</ul>
							
						</section>
					</div>
				
					<div className="about-venatus">

						<h1>História</h1>
						<p>A Venatus tem como linha editorial, os conteúdos paradidáticos que abordem temas variados como: família, cidadania, tecnologia, cultura, ficção e aventura, através de um texto leve que estimule o prazer pela leitura. Os temas são ótimos recursos para os Projetos de Leituras nas redes de ensino, potencializando os resultados de ensino aprendizagem e estimulando de maneira lúdica a criatividade e convivência entre os alunos e seus familiares.</p>
						
						<div className="about-line">
							<img src={faixa_azul} alt="Faixa Azul" />
						</div>

					</div>
				</div>
			
				<Footer />

			</>
		);
	}
}