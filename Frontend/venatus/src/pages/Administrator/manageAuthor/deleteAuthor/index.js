import React, { Component } from 'react';
import api from '../../../../services/api';
import Lottie from 'react-lottie';

import Dashboard from '../../../../components/Dashboard';

import './styles.css';
import BookstoreImg from '../../../../assets/administrator/bookstoreImg.svg';
import OkAnimation from '../../../../assets/Animations/OkPopUp.json';
import ErrorAnimation from '../../../../assets/Animations/ErrorPopUp.json';

export default class deleteAuthor extends Component {

  	state = {
		allAuthors: [],
		index: 0,
		author: [],

		isStopped: true,
	}
	  
	handleDashboardSize = () => {
		let elementSize = document.querySelector('.selectAuthor-wrapper').offsetHeight;
		document.querySelector('.administrator-panel').style.minHeight = `${elementSize}px`;
	}  

  	async loadAuthors() {
   	await api.get('/api/Autors').then(res => {
			console.log(res.data);
			this.setState({allAuthors: res.data});
    	}).catch(error => {
      	console.log('loadAuthors -> ' + error);
    	});
  	}

  	deleteAuthor = async (ID_Autor = 0) => {
      await api.delete(`/api/Autors/${ID_Autor}`).then(() => {
      	this.setState({isStopped: false});
			this.handlePopUp();
			this.loadAuthors();
			setTimeout(() => {
			  this.setState({isStopped: true});
			}, 3000);
		}).catch(error => {
			console.log('deleteAuthor -> ' + error);
			this.setState({isStopped: false});
			this.handlePopUp("error");
			setTimeout(() => {
        		this.setState({isStopped: true});
      	}, 3000);
    	});
  	}

  handleDeleteAuthor = (ID_Autor = 0, index = 0) => {
    let confirmDelete = window.confirm(`Deseja realmente deletar o Autor ${this.state.allAuthors[index].Nome}?`);
    if (confirmDelete) this.deleteAuthor(ID_Autor);
    else return;
  }

   //#region HandleAnimationPopUp() {
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
    this.loadAuthors();
  }

  render() {

   //#region AnimationSettins
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
        <div className="selectAuthor-wrapper">
          <Dashboard />
          <div className="selectAuthor-container">

            <h1>Selecione o Autor a ser deletado</h1>

            <ul>
              {this.state.allAuthors.map((author, index) => (
                <li key={author.ID_Autor}>
                  <button onClick={() => this.handleDeleteAuthor(author.ID_Autor, index)}>
                    <img src={BookstoreImg} alt={author.Nome}/>
                    <h2>{author.Nome}</h2>
                  </button>
                </li>
              ))}
            </ul>
          </div>

			 <div className="deletePopUp success">
              <Lottie options={okAnimationSettings}
                height={100}
                width={100}
                isStopped={this.state.isStopped}
              />
              <h1>Autor apagado com sucesso</h1>
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
    );
  }
}
