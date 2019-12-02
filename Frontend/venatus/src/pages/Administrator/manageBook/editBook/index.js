import React, { Component } from 'react';
import api from '../../../../services/api';
import Lottie from 'react-lottie';

import Dashboard from '../../../../components/Dashboard';

import './styles.css';
import Camera from '../../../../assets/administrator/camera.svg';
import OkAnimation from '../../../../assets/Animations/OkPopUp.json';
import ErrorAnimation from '../../../../assets/Animations/ErrorPopUp.json';

export default class editBook extends Component {

	state = {
		Titulo: "",
		SubTitulo: "",
		Numero_Paginas: 1,
		Categoria: "",
		Descricao: "a",
		Idioma: "",
		Classificacao_Indicativa: "L",
		ISBN: "",
		Ilustrador: "",
		ImagemURL: "",
		PagSeguroURL: "",
		Datapublicacao: "",
		Preco: 1.00,
		Formato: "",
		Sinopse: "",
		ID_Autor: 0,

		Book: [],
		allAuthors: [],
		Storage: [],
		ID_Storage: 0,
		StorageQuantity: 1,

		Image: null,
		ImagemPreview: "",

		imageChanged: false,
		isStopped: true,

		jwt: localStorage.getItem("jwt"),
	}

	handleDashboardSize = () => {
		let elementSize = document.querySelector('.editBook-wrapper').offsetHeight;
		document.querySelector('.administrator-panel').style.height = `${elementSize}px`;
	}  
  
	handleUploadImage = event => {
		this.setState({ImagemPreview: URL.createObjectURL(event.target.files[0])});
		this.setState({Image: event.target.files[0]});
		this.setState({imageChanged: true});
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
			console.log(res);
			this.setState({ImagemURL: res.data});
		}).catch(error => {
			console.log('Image => ' + error);
		});
 	};
	
	//#region APIcalls
		loadBook = async () => {
			await api.get(`/api/Livros/${this.props.match.params.id}`).then(res => {
				console.log(res.data);
				this.setState({Book: res.data});
				this.loadStorage();
				this.loadData();
			}).catch(error => {
				console.log('Error -> ' + error);
			});
		}
		
		loadAuthors = async () => {
			await api.get(`api/Autors`).then(res => {
				console.log(res.data);
				this.setState({allAuthors: res.data});
			}).catch(error => {
				console.log('Authors -> ' + error);
			});
		}

		loadStorage = async () => {
			await api.get(`api/Estoques/${this.state.Book.ID_Livro}`, {
				headers: {
					'Content-Type': 'application/json',
					"jwt": this.state.jwt,
				}
			}).then(res => {
				console.log(res.data);
				
				this.setState({ID_Storage: res.data[0].ID_Estoque, StorageQuantity: res.data[0].Quantidade});
			}).catch(error => {
				console.log("loadStorage => " + error);
			});
		}
	//#endregion

	handleDate = () => {
		const dataPublicacao = this.state.Book.Datapublicacao.split("T");
		return dataPublicacao[0];
	}
		
	loadData = () => {
		this.setState({
			Titulo: this.state.Book.Titulo,
			SubTitulo: this.state.Book.SubTitulo,
			Numero_Paginas: this.state.Book.Numero_Paginas,
			Categoria: this.state.Book.Categoria,
			Idioma: this.state.Book.Idioma,
			ImagemPreview: this.state.Book.Imagem_URL,
			Imagem_URL: this.state.Book.Imagem_URL,
			PagSeguroURL: this.state.Book.Botao_URL,
			Classificacao_Indicativa: this.state.Book.Classificacao_Indicativa,
			ISBN: this.state.Book.ISBN,
			Ilustrador: this.state.Book.Ilustrador,
			Datapublicacao: this.handleDate(),
			Formato: this.state.Book.Formato,
			Preco: this.state.Book.Preco,
			Sinopse: this.state.Book.Sinopse,
			ID_Autor: this.state.Book.Id_autor,
		});
		
	}

	componentDidMount() {
		this.loadBook();
		this.loadAuthors();

		this.handleDashboardSize();
	}

	handleSubmit = async event => {
		event.preventDefault();

		const headersData = {
			'Content-Type': 'application/json',
			"jwt": this.state.jwt,
		}

		if (this.state.imageChanged === true) {
			await this.handleFileUpload();

			await api.put(`api/Livros/${this.props.match.params.id}`, {
				"ID_Livro": this.state.Book.ID_Livro,
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
				"ID_Autor": this.state.ID_Autor,
				"Id_cupom": 0,
			}, {
				headers: headersData,
			}).then(res => {
				console.log(res);

				api.put(`api/Estoques/${this.state.ID_Storage}`, {
					"ID_Estoque": this.state.ID_Storage,
					"Quantidade": this.state.StorageQuantity,
					"Livro": this.state.Book.ID_Livro,
				} , {
					headers: headersData,
				}).then(res => {
					console.log(res.data);
					
					this.setState({isStopped: false});
					this.handleAnimationPopUp("success");
					setTimeout(() => {
					  this.setState({isStopped: true});
					}, 1000);
				}).catch(error => {
					console.log("Storage => " + error);
	
					this.setState({isStopped: false});
					this.handleAnimationPopUp("error", "Falha no estoque");
					setTimeout(() => {
						this.setState({isStopped: true});
					}, 3000);
				});
			}).catch(error => {
				console.log("Submit -> " + error);

				this.setState({isStopped: false});
				this.showAnimationPopUp("error");
				setTimeout(() => {
				this.setState({isStopped: true});
				}, 3000);
			});

		} else {

			await api.put(`api/Livros/${this.props.match.params.id}`, {
				"ID_Livro": this.state.Book.ID_Livro,
				"Titulo": this.state.Titulo,
				"SubTitulo": this.state.SubTitulo,
				"Numero_Paginas": this.state.Numero_Paginas,
				"Categoria": this.state.Categoria,
				"Descricao": "a",
				"Idioma": this.state.Idioma,
				"Classificacao_Indicativa": this.state.Classificacao_Indicativa,
				"ISBN": this.state.ISBN,
				"Ilustrador": this.state.Ilustrador,
				"Imagem_URL": this.state.Imagem_URL,
				"Botao_URL": this.state.PagSeguroURL,
				"Datapublicacao": this.state.Datapublicacao,
				"Preco": this.state.Preco,
				"Formato": this.state.Formato,
				"Sinopse": this.state.Sinopse,
				"ID_Autor": this.state.ID_Autor,
				"Id_cupom": 0,
			}, {
				headers: headersData,
			}).then(res => {
				console.log(res);

				api.put(`api/Estoques/${this.state.ID_Storage}`, {
					"ID_Estoque": this.state.ID_Storage,
					"Quantidade": this.state.StorageQuantity,
					"Livro": this.state.Book.ID_Livro,
				} , {
					headers: headersData,
				}).then(res => {
					console.log(res.data);
					
					this.setState({isStopped: false});
					this.handleAnimationPopUp("success");
					setTimeout(() => {
					  this.setState({isStopped: true});
					}, 1000);
				}).catch(error => {
					console.log("Storage => " + error);
	
					this.setState({isStopped: false});
					this.handleAnimationPopUp("error", "Falha no estoque");
					setTimeout(() => {
						this.setState({isStopped: true});
					}, 3000);
				});
			}).catch(error => {
				console.log("Submit -> " + error);

				this.setState({isStopped: false});
				this.showAnimationPopUp("error");
				setTimeout(() => {
				this.setState({isStopped: true});
				}, 3000);
			});
		}
	}

	//#region HandleAnimation()
		showAnimationPopUp = (element="", message="Algo deu errado") => {
			document.querySelector(`.editPopUp.${element}`).style.display = "block";
			document.querySelector('.editPopUp.error h1').innerHTML = message;
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

	//#region AnimationsController
		const okAnimation = {
			loop: false,
			autoplay: false, 
			animationData: OkAnimation,
			rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
			}
		};

		const errorAnimation = {
			loop: false,
			autoplay: false, 
			animationData: ErrorAnimation,
			rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
			}
		};
	//#endregion

    	return (

      		<div className="editBook-wrapper">
          	
				<Dashboard />

          		<div className="editBook-container">

            		<h1>Edição de Livro</h1>

            		<div className="editBook-data">
          
						<form onSubmit={this.handleSubmit}>

							<ul className="section item-1">

								<li>

									<label htmlFor="titulo">Titulo <span>*</span></label>
									<input 
										type="text" 
										id="titulo"
										placeholder="Nya - "
										required
										value={this.state.Titulo} 
										onChange={e => this.setState({Titulo: e.target.value})}
									/>

									<label htmlFor="subtitulo">SubTitulo <span>*</span></label>
									<input 
										type="text" 
										id="subtitulo"
										placeholder="#ConexãoPulmãoVerde"
										required
										value={this.state.SubTitulo} 
										onChange={e => this.setState({SubTitulo: e.target.value})}
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
										value={this.state.StorageQuantity} 
										onChange={e => this.setState({StorageQuantity: e.target.value})}
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
										<option value="L">Livre</option>
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
											accept=".png, .jpg, .jpeg"
											onChange={this.handleUploadImage}
										/>
										<img src={Camera} alt="IconeDeCamera"/>
									</label>

								</li>

							</ul>

							<button type="submit">Atualizar</button>
					
						</form>

            		</div>

         		</div>
          
				<div className="editPopUp success">
					<Lottie options={okAnimation}
						height={100}
						width={100}
						isStopped={this.state.isStopped}
					/>
					<h1>Livro editado com sucesso</h1>
				</div>

				<div className="editPopUp error">
					<Lottie options={errorAnimation}
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
