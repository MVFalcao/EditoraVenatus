import React, { Component } from 'react';

import api from '../../../../services/api';

import './styles.css';
import Dashboard from '../../../../components/Dashboard';
import Camera from '../../../../assets/administrator/camera.svg';

export default class addEvent extends Component {

	state = {
		Titulo: "",
		SubTitulo: "",
		Numero_Paginas: 1,
		Categoria: "",
		Descricao: "",
		Idioma: "",
		Classificacao_Indicativa: "L",
		ISBN: "",
		Ilustrador: "",
		Datapublicacao: "",
		Preco: 1.00,
		Formato: "",
		Sinopse: "",
		ImagemURL: "",
		PagSeguroURL: "",

		ID_Livro: 0,
		ID_Autor: 1,
		Storage: 1,
		
		allAuthors: [],

		Image: null,
		ImagemPreview: "",

		jwt: localStorage.getItem("jwt"),		
	}

	handleDashboardSize = () => {
		let elementSize = document.querySelector('.addEvent-wrapper').offsetHeight;
		document.querySelector('.administrator-panel').style.minHeight = `${elementSize}px`;
	}  

	loadAuthors = async () => {
		await api.get(`api/Autors`).then(res => {
			console.log(res.data);
			this.setState({allAuthors: res.data})
		}).catch(error => {
			console.log('loadAuthors => ' + error);   
		});
	}
	
	componentDidMount() {
    	this.loadAuthors();
    	this.handleDashboardSize();
  	}

	//#region ImageUpload() 
		handleUploadImage = event => {
			this.setState({ImagemPreview: URL.createObjectURL(event.target.files[0])});
			this.setState({Image: event.target.files[0]});
		}

		handleFileUpload = async () => {
			let config = {
				headers: {
					'content-type': 'multipart/form-data',
				},
			};
			let formData = new FormData();
			formData.append('image', this.state.Image);
			await api.post(`/Upload`,
				formData,
				config
			).then(res => {
				console.log(res.data);
				this.setState({ImagemURL: res.data});
			}).catch(error => {
				console.log('Image => ' + error);
			});
		};
	//#endregion

  	handleSubmit = async event => {
	event.preventDefault();
	const headersData = {
		'Content-Type': 'application/json',
		"jwt": this.state.jwt,
	}

    await this.handleFileUpload();

    await api.post('api/Livros', {
		"Titulo": this.state.Titulo,
		"SubTitulo": this.state.SubTitulo,
		"Numero_Paginas": this.state.Numero_Paginas,
		"Categoria": this.state.Categoria,
		"Descricao": "a",
		"Idioma": this.state.Idioma,
		"Classificacao_Indicativa": this.state.Classificacao_Indicativa,
		"ISBN": this.state.ISBN,
		"Ilustrador": this.state.Ilustrador,
		"Imagem_URL": this.state.ImagemURL,
		"Botao_URL": this.state.PagSeguroURL,
		"Datapublicacao": this.state.Datapublicacao,
		"Preco": this.state.Preco,
		"Formato": this.state.Formato,
		"Sinopse": this.state.Sinopse,
		"Id_autor": this.state.ID_Autor,
		"Id_cupom": 0,
		}, {
			headers: headersData,
		}).then(res => {
			console.log(res.data);

			api.post('api/Estoques', {
				"Quantidade": this.state.Storage,
				"Livro": res.data.ID_Livro,
			} , {
				headers: headersData,
			}).then(res => {
				console.log(res.data);
				
				
			}).catch(error => {
				console.log("Storage => " + error);

				
			});
		}).catch(error => {
			console.log("Book => " + error);

			this.setState({isStopped: false});
			this.handleAnimationPopUp("error");
			setTimeout(() => {
			  this.setState({isStopped: true});
			}, 3000);
		});
	}

  	render() {

    	return (

      	<div className="addEvent-wrapper">

          	<Dashboard />

				<div className="add-container">

            		<h1>Cadastro de Livro</h1>

           		<div className="addEvent-data">
          
              		<form onSubmit={this.handleSubmit}>

                		<ul className="section item-1">

								<li>

									<label htmlFor="titulo">Titulo <span>*</span></label>
									<input 
										type="text" 
										id="titulo"
										required
										value={this.state.Titulo} 
										onChange={e => this.setState({Titulo: e.target.value})}
									/>

									<label>Autor <span>*</span></label>
									<select id="author-select" value={this.state.ID_Autor} onChange={e => this.setState({ID_Autor: e.target.value})}>
											{this.state.allAuthors.map(author => (
												<option key={author.ID_Autor} value={author.ID_Autor}>{author.Nome}</option>
											))}
									</select>

									<label htmlFor="dataPublicacao">Data de Publicação <span>*</span></label>
									<input 
										type="date" 
										id="dataPublicacao"
										required
										value={this.state.Datapublicacao} 
										onChange={e => this.setState({Datapublicacao: e.target.value})}
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
									
									<label htmlFor="ISBN">ISBN <span>*</span></label>
									<input 
										type="text" 
										id="ISBN"
										required
										value={this.state.ISBN} 
										onChange={e => this.setState({ISBN: e.target.value})}
									/>

									<label htmlFor="idioma">Idioma <span>*</span></label>
									<input 
										type="text" 
										id="idioma"
										required
										value={this.state.Idioma} 
										onChange={e => this.setState({Idioma: e.target.value})}
									/>

									<label htmlFor="ilustrador">Ilustrador <span>*</span></label>
									<input 
										type="text" 
										id="ilustrador"
										required
										value={this.state.Ilustrador} 
										onChange={e => this.setState({Ilustrador: e.target.value})}
									/>

									<label htmlFor="preco">Preço <span>*</span></label>
									<input 
										type="number"
										id="preco"
										step=".01"
										min="1"
										required
										value={this.state.Preco} 
										onChange={e => this.setState({Preco: e.target.value})}
										onFocus={e => e.target.select()}
									/>

									<label htmlFor="storage">Estoque <span>*</span></label>
									<input 
										type="number"
										id="storage"
										min="1"
										required
										value={this.state.Storage} 
										onChange={e => this.setState({Storage: e.target.value})}
										onFocus={e => e.target.select()}
									/>

								</li>

								<li>

									<label htmlFor="dimensoes">Dimensões <span>*</span></label>
									<input 
										type="text"
										id="dimensoes"
										placeholder="72 x 20 (Comp. x Larg.) "
										required
										value={this.state.Formato} 
										onChange={e => this.setState({Formato: e.target.value})}
									/>

									<label htmlFor="categoria">Categoria <span>*</span></label>
									<input 
										type="text" 
										id="categoria"
										required
										value={this.state.Categoria} 
										onChange={e => this.setState({Categoria: e.target.value})}
									/>

									<label>Classificação Indicativa <span>*</span></label>
									<select value={this.state.Classificacao_Indicativa} onChange={e => this.setState({Classificacao_Indicativa: e.target.value})}>
										<option value="0">Livre</option>
										<option value="10">Maiores de 10 anos</option>
										<option value="12">Maiores de 12 anos</option>
										<option value="14">Maiores de 14 anos</option>
										<option value="16">Maiores de 16 anos</option>
										<option value="18">Maiores de 18 anos</option>
									</select>

									<label htmlFor="numeroPaginas">Número de Páginas <span>*</span></label>
									<input 
										type="number"
										id="numeroPaginas"
										min="1"
										required
										value={this.state.Numero_Paginas} 
										onChange={e => this.setState({Numero_Paginas: e.target.value})}
										onFocus={e => e.target.select()}
									/>

								</li>

							</ul>

							<ul className="section item-2">

								<li>

									<label htmlFor="sinopse">Sinopse <span>*</span></label>
									<textarea
										id="sinopse" 
										cols="30" 
										rows="10" 
										required
										value={this.state.Sinopse} 
										onChange={e => this.setState({Sinopse: e.target.value})}>
									</textarea>

								</li>

								<li id="imagem-container">

									<label id="label-imagem" htmlFor="imagemURL">Imagem do Livro <span>*</span></label>
									<label id="imagem-livro" htmlFor="imagemURL" className={this.state.ImagemPreview ? 'has-image' : ''} style={{ backgroundImage: `url(${this.state.ImagemPreview})`}}>
										<input 
											type="file" 
											id="imagemURL"
											required
											accept=".png, .jpg, .jpeg"
											onChange={this.handleUploadImage}
										/>
										<img src={Camera} alt="IconeDeCamera"/>
									</label>

								</li>

							</ul>

							<button type="submit">Cadastrar</button>

              		</form>

            	</div>
			
				</div>

      	</div>
    	);
  	}
}
