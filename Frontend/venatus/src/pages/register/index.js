import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Lottie from 'react-lottie';

import './styles.css';
import logo from '../../assets/header/logo_l.svg';
import eye from '../../assets/myAccount/olho.svg'
import OkAnimation from '../../assets/Animations/OkPopUp.json';
import ErrorAnimation from '../../assets/Animations/ErrorPopUp.json';


export default class signup extends Component {

	state = {
		ID_Cliente: 0,
		ID_Telefone: 0,
		ID_Pessoa: 0,
		ID_Login: 0,
		ID_RedeSocial: 0,

		Name: '',
		LastName: '',
		Username: '',
		Email: '',
		CPF: '',
		Telephone: '',
		Gender: 'M',
		Desconto: '',
		TipoPessoa: '',
		Birthdate: '',
		Password: '',
		ConfirmPassword: '',

		isStopped: true,
		matchPassword: false,
		hideList: [true, true],
		sucessPost: [false, false, false, false, false],

		isCreated: false,
	}

	//#region handlePassword
		handlePassword = () => {
			let passwordElement = document.querySelector('.password-warning');

			let passwordInput = document.querySelector('#password')
			let confirmPasswordInput = document.querySelector('#confirm-password')

			if (passwordInput.value.length === 0 || confirmPasswordInput.value.length === 0) {
				passwordElement.style.display = "none";
				this.setState({matchPassword: false});
			} else {
				if (this.state.Password !== this.state.ConfirmPassword) {
					passwordElement.style.display = "block";
					this.setState({matchPassword: false});
				} else {
					passwordElement.style.display = "none";
					this.setState({matchPassword: true});
				}
			}    
		}

		handlePasswordVerification = async e => {
			await this.setState({Password: e.target.value});
			this.handlePassword();
		}

		handleConfirmPasswordVerification = async e => {
			await this.setState({ConfirmPassword: e.target.value});
			this.handlePassword();
		}


		handlePasswordVision(element="", item=0) {
			const EyeElement = document.querySelector(element);

			const showPassword = () => {
			EyeElement.type = "text";
			}

			const hidePassword = () => {
			EyeElement.type = "password";
			}

			if (this.state.hideList[item] === true) {
			showPassword();
			let a = this.state.hideList;
			a[item] = false;
			this.setState({hideList: a});
			} else {
			hidePassword();
			let a = this.state.hideList;
			a[item] = true;
			this.setState({hideList: a});
			}
		}
	//#endregion

	handleDelete = () => {
		
		api.delete(`/api/Clientes/${this.state.ID_Cliente}`).then(res => {
			console.log('Erro na criação do Usuário, Cliente apagado');
		}).catch( error => {
			console.log('DeleteCostumer -> ' + error);
		});
	
		api.delete(`api/Pessoas/${this.state.ID_Pessoa}`).then( res => {
			console.log('Erro na criação do Usuário, Pessoa apagado');
		}).catch( error => {
			console.log('DeletePessoa -> ' + error);
		});
	
		api.delete(`api/Logins/${this.state.ID_Login}`).then(res => {
			console.log('Erro na ciração do Usuário, Login apagado');
		}).catch( error => {
			console.log('DeleteLogin -> ' + error);
		});

		api.delete(`api/RedeSocials/${this.state.ID_RedeSocial}`).then(res => {
			console.log('Erro na criação do Usuário, RedeSocials apagado');	
		}).catch( error => {
			console.log('RedeSocials -> ' + error);
		});

		api.delete(`api/Telefones/${this.state.ID_Telefone}`).then(res => {
			console.log('Erro na criação do Usuário, Telefone apagado');	
		}).catch( error => {
			console.log('RedeSocials -> ' + error);
		});
	}

	handleSubmit = async event => {
		event.preventDefault();
		let a = this.state.sucessPost;

		if(this.state.matchPassword) {	
			await api.post('api/Clientes', {

			}).then(res => {
				console.log(res.data);
				this.setState({ID_Cliente: res.data.ID_Cliente});
				this.setState({sucessPost: a[0] = true});	
			}).catch(error => {
				console.log("Clientes -> " + error);
			});

			await api.post('api/Pessoas', {
				'Nome': this.state.Name,
				'Sobrenome': this.state.LastName,
				'CPF': this.state.CPF,
				'Tipo_pessoa': this.state.TipoPessoa,
				'Desconto': this.state.Desconto,
				'Data_Nascimento': this.state.Birthdate,
				'sexo': this.state.Gender,
				'Id_cli': this.state.ID_Cliente,
			}).then(res => {
				console.log(res.data);
				this.setState({ID_Pessoa: res.data.ID_Pessoa});
				this.setState({sucessPost: a[1] = true});	
			}).catch( error => {
				this.handleDelete();
				console.log("Pessoas -> " + error);
			});

			await api.post('api/Logins', {
				'Usuario': this.state.Username,
				'Senha': this.state.Password,
				'cliente': this.state.ID_Cliente,
			}).then(res => {
				console.log(res.data);
				this.setState({ID_Login: res.data.ID_Login});
				this.setState({sucessPost: a[2] = true});		
			}).catch(error => {
				this.handleDelete();
				console.log("Login -> " + error);
			});
			
			await api.post('api/RedeSocials', {
				'email': this.state.Email,
				'Id_cli': this.state.ID_Cliente,
			}).then( res => {
				console.log(res.data);
				this.setState({ID_RedeSocial: res.data.ID_RedeSocial});
				this.setState({sucessPost: a[3] = true});
			}).catch( error => {
				console.log("RedeSocials -> " + error);
				this.handleDelete();
			});

			await api.post('api/Telefones', {
				"Tipo_Telefone": "movel",
				"Numero": this.state.Telephone,
				"Id_c": this.state.ID_Cliente,
			}).then(res => {
				console.log(res.data);
				this.setState({ID_Telefone: res.data.ID_Telefone});
				this.setState({sucessPost: a[4] = true});
			}).catch( error => {
				console.log("Telefone -> " + error);
				this.handleDelete();
			});
		} else {
			return;
		}
		if (a.every(elem => elem === true)) {
			this.setState({isStopped: false});
            this.handleAnimationPopUp("success");
            setTimeout(() => {
              this.setState({isStopped: true});
			}, 3000);				
		} else {
			a = [false, false, false, false, false];
			this.setState({sucessPost: a});

            this.setState({isStopped: false});
            this.handleAnimationPopUp("error");
            setTimeout(() => {
                this.setState({isStopped: true});
            }, 3000);
		}
	}


	//#region AnimationPopUp
	showAnimationPopUp = (element = "") => {
		document.querySelector(`.addPopUp.${element}`).style.display = "block";
	}
	
	hideAnimationPopUp = (element = "") => {
		document.querySelector(`.addPopUp.${element}`).style.display = "none";
	}

	handleAnimationPopUp = (element = "") => {
		this.showAnimationPopUp(element);
		setTimeout(() => {
			this.props.history.push('/Login');
		}, 3000);
	}
      //#endregion

	render() {

		//#region AnimationSettings
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

		const passwordDiv = {
			position: 'absolute',
			top: '780px', left: '283px', right: '0px', bottom: '0px',
			color: 'red',
			fontSize: '14px',
			fontWeight: '300',
			display: 'none',
		}

		//#region eyeStyles
		const eyeImg = {
			top: '32px', left: '260px',
		}
		
		const eyeImg2 = {
			top: '32px', left: '263px',
		}
		//#endregion

		return (

			<div className="signin-container">

				<div className="signin-content">

					<Link to="/">
						<img src={logo} alt="Logo da Venatus"/>
					</Link>

					<div className="header-text">
						<p>Entre na Venatus</p>
						<h1>Crie sua conta</h1>
					</div>

					<div className="line item-2" />

					<form onSubmit={this.handleSubmit}>
						
						<ul>

							<li>
								<label htmlFor="name">Nome <span>*</span></label>
								<input type="text" 
									id="name"
									title="Digite seu nome"
									required
									value={this.state.Name} 
									onChange={e => this.setState({Name: e.target.value})}
								/>
							</li>

							<li>
								<label htmlFor="last-name">Sobrenome <span>*</span></label>
								<input type="text" 
								id="last-name"
								title="Digite seu sobrenome"
								required
								value={this.state.LastName} 
								onChange={e => this.setState({LastName: e.target.value})}
								/>
							</li>

							<li>
								<label htmlFor="username">Usuário <span>*</span></label>
								<input type="text"
								id="username"
								title="Crie um nome de usuário"
								required
								value={this.state.Username} 
								onChange={e => this.setState({Username: e.target.value})} 
								/>
							</li>

							<li>
								<label htmlFor="email">Email <span>*</span></label>
								<input type="email" 
								id="email"
								title="Digite seu email"
								required
								value={this.state.Email}
								onChange={e => this.setState({Email: e.target.value})}
								/>
							</li>

							<li>
								<label htmlFor="cpf">CPF <span>*</span></label>
								<input type="text" 
								id="cpf"
								required
								maxLength="14"
								value={this.state.CPF}
								onChange={e => this.setState({CPF: e.target.value})} 
								/>
							</li>

							<li>
								<label htmlFor="birthDate">Data de Nascimento <span>*</span></label>
								<input
								type="date"
								id="birthDate" 
								required
								value={this.state.Birthdate} 
								onChange={e => this.setState({Birthdate: e.target.value})} 
								/>
							</li>

							<li>
								<label htmlFor="telephone">Telefone <span>*</span></label>
								<input
								type="text"
								id="telephone" 
								required
								maxLength="15"
								placeholder="(DDD) 9xxxx-xxxx"
								value={this.state.Telephone} 
								onChange={e => this.setState({Telephone: e.target.value})} 
								/>
							</li>

							<li id="gender-wrapper">
								<label>Sexo <span>*</span></label>
								<div className="gender-container">
								
								<input type="radio"
									id="gender-m" 
									name="gender"
									value='M'
									checked = {this.state.Gender === 'M'}
									onChange={e => this.setState({Gender: e.target.value})}
								/>
								<label htmlFor="gender-m">Masculino</label>
								
								<input type="radio"
									id="gender-f" 
									name="gender"
									value='F'
									checked = {this.state.Gender === 'F'}
									onChange = {e => this.setState({Gender: e.target.value})}
								/>
								<label htmlFor="gender-f">Feminino</label>

								</div>
								{/* {console.log(this.state.Gender)} */}
							</li>

							<li id="organizer-li" />

							<li style={{position: 'relative'}}>
								<label id="password-label" htmlFor="password">Senha <span>*</span></label>
								<input 
									type="password" 
									id="password" 
									required 
									placeholder="Senha de 6 dígitos"
									value={this.state.Password} 
									onChange={e => this.handlePasswordVerification(e)}
								/>
								<img className="eye" src={eye} alt="" draggable="false" style={eyeImg} onMouseDown={() => this.handlePasswordVision('#password', 0)} onMouseUp={() => this.handlePasswordVision('#password', 0)}/>
							</li>

							<div className="password-warning" style={passwordDiv}>As senhas estão diferentes</div>

							<li style={{position: 'relative'}}>
								<label htmlFor="confirm-password">Confirme a senha <span>*</span></label>
								<input 
									type="password" 
									id="confirm-password"
									required
									placeholder="Redigite sua senha" 
									value={this.state.ConfirmPassword} 
									onChange={e => this.handleConfirmPasswordVerification(e)} />
								<img className="eye" src={eye} alt="" draggable="false" style={eyeImg2} onMouseDown={() => this.handlePasswordVision('#confirm-password', 1)} onMouseUp={() => this.handlePasswordVision('#confirm-password', 1)}/>
							</li>

						</ul>

						<div className="buttons">
							<button type="submit">Criar Conta</button>
							<Link to="/login">Cancelar</Link>
						</div>
				
					</form>

				</div>

			<p id="footer">&copy; Editora Venatus</p>

			<div className="addPopUp success">
				<Lottie options={okAnimation}
					height={100}
					width={100}
					isStopped={this.state.isStopped}
				/>
				<h1>Usuário criado com sucesso</h1>
			</div>

			<div className="addPopUp error">
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