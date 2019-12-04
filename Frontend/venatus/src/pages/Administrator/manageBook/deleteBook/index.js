import React, { Component } from 'react';
import api from '../../../../services/api';
import Lottie from 'react-lottie';

import Dashboard from '../../../../components/Dashboard';

import './styles.css';
import OkAnimation from '../../../../assets/Animations/OkPopUp.json';
import ErrorAnimation from '../../../../assets/Animations/ErrorPopUp.json';

export default class editBook extends Component {

  state = {
	 allBooks: [],
	 IDs_Coupons: [],
	 

	 isStopped: true,
	 jwt: localStorage.getItem("jwt"),
  }

  	handleHeaders = () => {
		const headersData = {
			'Content-Type': 'application/json',
			"jwt": this.state.jwt,
		}
		return headersData;
	}

	loadBooks = async () => {
		await api.get('/api/Livros').then(res => {
			console.log(res.data);
			this.setState({allBooks: res.data});
		}).catch(error => {
			console.log('Error: ' + error.message);
		});
	}

	deleteStorage = async (ID_Livro = 0) => {
		let ID_Estoque = 0;

		await api.get(`api/Estoques/${ID_Livro}`, {
			headers: this.handleHeaders(),
		}).then(res => {
			console.log(res.data);

			ID_Estoque = res.data[0].ID_Estoque;

			api.delete(`api/Estoques/${ID_Estoque}`, {
				headers: this.handleHeaders(),
			}).then(res => {
				console.log(res.data);
			}).catch(error => {
				console.log('deleteStorage -> ' + error);
			});
		}).catch(error => {
			console.log('getStorageByBook -> ' + error);
		});
	}

	deleteCupons = async (ID_Livro = 0) => {
		await api.get(`api/GetCupomLivro/${ID_Livro}`, {
			headers: this.handleHeaders(),
		}).then(res => {
			this.setState({IDs_Coupons: res.data});

			for (const coupon of this.state.IDs_Coupons) {
				api.delete(`api/Cupoms/${coupon}`, {
					headers: this.handleHeaders(),
				}).then(res => {
					console.log(res);
				}).catch(error => {
					console.log('deleteCoupons -> ' + error);
				})
			}
		}).catch(error => {
			console.log("getCupomLivro -> " + error);
		});
	}

  	deleteBook = async (ID_Livro = 0) => {

		const jwt = localStorage.getItem("jwt");
		const headersData = {
			'Content-Type': 'application/json',
			"jwt": jwt,
		}

		this.deleteStorage(ID_Livro);

		api.delete(`/api/Livros/${ID_Livro}`, {
			headers: headersData,
			}).then(res => {
			console.log(res.data);
			
			this.setState({isStopped: false});
			this.handleAnimationPopUp("success");
			this.loadBooks();
			setTimeout(() => {
				this.setState({isStopped: true});
			}, 3000);
			
		}).catch(error => {
			console.log('deleteBook -> ' + error);
			
			this.setState({isStopped: false});
			this.handleAnimationPopUp("error");
			setTimeout(() => {
				this.setState({isStopped: true});
			}, 3000);
			});

			this.deleteCupons(ID_Livro);
  }

  handleDeleteBook = (ID_Livro = 0, index = 0) => {
    let confirmDelete = window.confirm(`Deseja realmente deletar o livro ${this.state.allBooks[index].Titulo} ${this.state.allBooks[index].SubTitulo}?`);
    if (confirmDelete) this.deleteBook(ID_Livro);
    else return;
  }

	//#region HandleAnimationPopUp
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

  componentDidMount() {
    this.loadBooks();
  }

  render() {

   //#region AnimationSettings
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
        <div className="selectBook-wrapper">
          <Dashboard />
          <div className="selectBook-container">

            <h1>Selecione o livro a ser deletado</h1>

            <ul>
              {this.state.allBooks.map((book, index) => (
                <li key={book.ID_Livro}>
                  <button onClick={() => this.handleDeleteBook(book.ID_Livro, index)}>
                    <img src={book.Imagem_URL} alt={book.Titulo}/>
                    <h2>{book.Titulo} {book.SubTitulo}</h2>
                  </button>
                </li>
              ))}
            </ul>

            <div className="deletePopUp success">
              <Lottie options={okAnimationSettings}
                height={100}
                width={100}
                isStopped={this.state.isStopped}
              />
              <h1>Livro deletado com sucesso</h1>
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
        </div>
    );
  }
}
