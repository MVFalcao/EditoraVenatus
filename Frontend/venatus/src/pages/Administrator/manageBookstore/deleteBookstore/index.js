import React, { Component } from 'react';
import api from '../../../../services/api';
import Lottie from 'react-lottie';

import Dashboard from '../../../../components/Dashboard';

import './styles.css';
import BookstoreImg from '../../../../assets/administrator/bookstoreImg.svg';
import OkAnimation from '../../../../assets/Animations/OkPopUp.json';

export default class deleteBookstore extends Component {

	state = {
		allBookstores: [],
		index: 0,
		books: [],

		isStopped: true,
		jwt: localStorage.getItem("jwt"),
	}

	async loadBookstores() {
		await api.get('/api/Livrarias', {
			headers: {"jwt": this.state.jwt}
		}).then(res => {
			console.log(res.data);
			this.setState({allBookstores: res.data});
		}).catch(error => {
			console.log('loadBookstore: ' + error);
		});
	}

	deleteBookstore = async (ID_Livraria = 0) => {
		await api.delete(`/api/Livrarias/${ID_Livraria}`, {
			headers: {"jwt": this.state.jwt}
		}).then(res => {
			console.log(res.data);

			this.setState({isStopped: false});
			this.handlePopUp();
			this.loadBookstores();
			setTimeout(() => {
				this.setState({isStopped: true});
			}, 3000);
		}).catch(function(error) {
			console.log('Error: ' + error.message);
		});
	}

	handleDeleteBookstore = (ID_Livraria = 0, index = 0) => {
		let confirmDelete = window.confirm(`Deseja realmente deletar a livraria ${this.state.allBookstores[index].Nome}?`);
		if (confirmDelete) this.deleteBookstore(ID_Livraria);
		else return;
	}

		//#region HandlePopUp() {
		showPopUp = () => {
			document.querySelector('.deletePopUp').style.display = "block";
		}
	
		hidePopUp = () => {
			document.querySelector('.deletePopUp').style.display = "none";
		}

		handlePopUp = () => {
			this.showPopUp();
			setTimeout(() => {
			this.hidePopUp();
			}, 3000);
		}
	//#endregion

	componentDidMount() {
		this.loadBookstores();
	}

  render() {

    const defaultOptions = {
      loop: false,
      autoplay: false, 
      animationData: OkAnimation,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    return (
        <div className="selectBookstore-wrapper">
          <Dashboard />
          <div className="selectBookstore-container">

            <h1>Selecione a Livraria a ser deletada</h1>

            <ul>
              {this.state.allBookstores.map((bookstore, index) => (
                <li key={bookstore.ID_Livraria}>
                  <button onClick={() => this.handleDeleteBookstore(bookstore.ID_Livraria, index)}>
                    <img src={BookstoreImg} alt={bookstore.Nome}/>
                    <h2>{bookstore.Nome}</h2>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="deletePopUp">
              <Lottie options={defaultOptions}
                height={100}
                width={100}
                isStopped={this.state.isStopped}
              />
              <h1>Livraria apagada com sucesso</h1>
          </div>

        </div>
    );
  }
}
