import React, { Component } from 'react';
import api from '../../../../services/api';
import Lottie from 'react-lottie';

import './styles.css';
import Dashboard from '../../../../components/Dashboard';
import OkAnimation from '../../../../assets/Animations/OkPopUp.json';
import ErrorAnimation from '../../../../assets/Animations/ErrorPopUp.json';

export default class editBookstore extends Component {

	state = {
		Nome: "",
		CPF: "",

		Author: [],
		isStopped: true,
	}
  
	loadAuthor = async () => {
		await api.get(`/api/Autors/${this.props.match.params.id}`).then(res => {
			console.log(res.data);

			this.setState({Author: res.data})
			this.loadAuthorData();
		}).catch(error => {
			console.log('Author -> ' + error);
		});
	}
    
  loadAuthorData = () => {
		this.setState({Nome: this.state.Author.Nome});
		this.setState({CPF: this.state.Author.CPF});
  }

  componentDidMount() {
   	this.loadAuthor();
  }

  handleSubmit = async event => {
    event.preventDefault();

    await api.put(`api/Autors/${this.props.match.params.id}`, {
      "ID_Autor": this.state.Author.ID_Autor,
      "Nome": this.state.Nome,
      "CPF": this.state.CPF,
    }).then(res => {
      console.log(res.data);

      this.setState({isStopped: false});
      this.handlePopUp("success");
      setTimeout(() => {
        this.setState({isStopped: true});
      }, 3000);
    }).catch(error => {
      console.log("Error: " + error.message);
      
      this.setState({isStopped: false});
      this.handlePopUp("error");
      setTimeout(() => {
        this.setState({isStopped: true});
      }, 3000);
    });
  }

	showPopUp = (element="") => {
		document.querySelector(`.editPopUp.${element}`).style.display = "block";
	}
  
	hidePopUp = (element="") => {
		document.querySelector(`.editPopUp.${element}`).style.display = "none";
	}

  	handlePopUp = (element = "") => {
		this.showPopUp(element);
		setTimeout(() => {
		this.hidePopUp(element);
		}, 3000);
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
      <div className="editAuthor-wrapper">

      	<Dashboard />

      	<div className="editAuthor-container">

				<h1>Editar Autor</h1>

				<div className="editAuthor-data">
				
					<form onSubmit={this.handleSubmit}>

						<ul className="section item-1">

						<li>
							<label htmlFor="nome">Nome <span>*</span></label>
							<input 
								type="text" 
								id="nome"
								required
								value={this.state.Nome} 
								onChange={e => this.setState({Nome: e.target.value})}
							/>
						</li>

						<li>
							<label htmlFor="CPF">CPF <span>*</span></label>
							<input 
								type="text" 
								id="CPF"
								required
								maxLength="14"
								value={this.state.CPF} 
								onChange={e => this.setState({CPF: e.target.value})}
							/>
						</li>

						</ul>

						<button type="submit">Atualizar</button>

					</form>

				</div>

			</div>

			<div className="editPopUp success">
              <Lottie options={okAnimationSettings}
                height={100}
                width={100}
                isStopped={this.state.isStopped}
              />
              <h1>Autor editado com sucesso</h1>
			</div>

			<div className="editPopUp error">
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