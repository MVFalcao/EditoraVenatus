import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './styles.css';
import lupa from '../../assets/allBooks/lupa-branca.svg'
import carrinho from '../../assets/header/carrinho.svg'


export default class books extends Component {
 

	state = {
		Search: '',

		allBooks: [],
		searchBooks: [],

		isEmpty: true,
	}

	loadBooks = async () => {
      await api.get('/api/Livros').then(res => {
			console.log(res.data);
			this.setState({allBooks: res.data});
		}).catch(error => {
			console.log('Books -> ' + error);
		});
	}

	handleSearch = async event => {
		this.setState({Search: event.target.value});
		await api.get(`api/GetLivrosNome`).then(res => {
			console.log(res);
		}).catch(error => {
			console.log('Search -> ' + error);
		});

		if (document.querySelector('#search-input').value.length === 0) this.setState({isEmpty: true});
		else this.setState({isEmpty: false});
	}
	 
	componentDidMount() {
		this.loadBooks();
	}

	render() {

		return (

			<>

            <Header />

				<div className="search-wrapper">

					<div className="search-container">

						<form>

							<input 
								type="text" 
								id="search-input"
								placeholder="O que você procura?"
								value={this.state.search}
								onChange={this.handleSearch}
							/>
							<label htmlFor="#search-input" className="search-btn">
								<img src={lupa} alt="lupa"></img>
							</label>

						</form>

					</div>

				</div>

				<div className="allBooks-wrapper">

						<h1>Livros da Editora</h1>

						<section className="allBooks-Container">

							<ul>
								{this.state.isEmpty ? 

									this.state.allBooks.map(book => (
										<li key={book.ID_Livro}>
												<Link to={`/bookPage/${book.ID_Livro}`}>
													<img src={book.Imagem_URL} alt={book.Titulo} />
												</Link>

												<h2>{book.Titulo} {book.SubTitulo}</h2>

												<p>R$ {parseFloat(book.Preco).toFixed(2)}</p>

												<a 
													href={book.Botao_URL} 
													target="_blank" rel="noopener noreferrer">
													<img src="//assets.pagseguro.com.br/ps-integration-assets/botoes/pagamentos/205x30-pagar-azul.gif"
													alt="Pague com PagSeguro - é rápido, grátis e seguro!"/>
												</a>
										</li>
										)
									)
								:
									this.state.searchBooks.map(book => (
										<li key={book.ID_Livro}>
												<Link to={`/bookPage/${book.ID_Livro}`}>
													<img src={book.Imagem_URL} alt={book.Titulo} />
												</Link>

												<h2>{book.Titulo} {book.SubTitulo}</h2>

												<p>R$ {parseFloat(book.Preco).toFixed(2)}</p>

												<a 
													href={book.Botao_URL} 
													target="_blank" rel="noopener noreferrer">
													<img src="//assets.pagseguro.com.br/ps-integration-assets/botoes/pagamentos/205x30-pagar-azul.gif"
													alt="Pague com PagSeguro - é rápido, grátis e seguro!"/>
												</a>
										</li>
									)
								)}
							</ul>

						</section>

                </div>
            	
				<Footer />

			</>
    	);
  	}
}