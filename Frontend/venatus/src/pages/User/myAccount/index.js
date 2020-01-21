import React, { Component } from 'react';
import api from '../../../services/api';
import Lottie from 'react-lottie';

import Header from '../../../components/Header';
import AccountPages from '../../../components/AccountPages';
import UserInfo from '../../../components/UserInfo';

import './styles.css';
import eye from '../../../assets/myAccount/olho.svg'
import OkAnimation from '../../../assets/Animations/OkPopUp.json';
import ErrorAnimation from '../../../assets/Animations/ErrorPopUp.json';

export default class myAccount extends Component {

	state = {
		Name: '',
		LastName: '',
		CPF: '',
		Telefone: '',
		Email: '',
		Data_Nascimento: '',

		NewPassword: '',
		ConfirmPassword: '',
		OldPassword: '',
		matchPassword: false,

		user: [],
		person: [],
		telephone: [],
		socialNetwork: [],

		isStopped: true,
		hideList: [true, true, true],

		ID_Cliente: localStorage.getItem("ID_Cliente"),
		jwt: localStorage.getItem("jwt"),
	}
		
	//#region handlePassword
		handlePassword = () => {
			let passwordElement = document.querySelector('.password-warning');
			let passwordInput = document.querySelector('#new-password')
			let confirmPasswordInput = document.querySelector('#confirm-password')

			if (passwordInput.value.length === 0 || confirmPasswordInput.value.length === 0) {
				passwordElement.style.display = "none";
				this.setState({matchPassword: false});
			} else {
				if (this.state.NewPassword !== this.state.ConfirmPassword) {
					passwordElement.style.display = "block";
					this.setState({matchPassword: false});
					} else {
						passwordElement.style.display = "none";
						this.setState({matchPassword: true});
					}
			}    
		}

		handlePasswordVerification = async e => {
			await this.setState({NewPassword: e.target.value});
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

	//#region LoadAPI
		handleHeaders = () => {
			const headersData = {
				'Content-Type': 'application/json',
				"jwt": this.state.jwt,
			}
			return headersData;
		}


		loadLogin = async () => {
			const jwt = localStorage.getItem("jwt");
			await api.get('api/getToken', { headers: { "jwt": jwt }}).then(res => {
				this.setState({ user: res.data});
				
				this.loadPerson();
				this.loadTelephone();
				this.loadSocialNetwork();
				console.log(res.data);
			}).catch(error => {
				console.log('Token Error: ' + error.message);
			});
		}
		
		loadPerson = async () => {

				await api.get(`/api/Pessoas/${this.state.ID_Cliente}`, {
					headers: this.handleHeaders(),
				}).then(response => {
						this.setState({ person: response.data});

						this.loadPersonData();
						console.log(response.data);
				}
				).catch(error => {
						console.log('Pessoa Error: ' + error.message);
				});
		}

		loadTelephone = async () => {
			await api.get(`/api/Telefones/GetTelefoneByCliente?id=${this.state.ID_Cliente}`, {
					headers: this.handleHeaders(),
				}).then(response => {
				this.setState({ telephone: response.data});

				this.loadTelephoneData();
				console.log(response.data);  
			}).catch(error => {
				console.log('Telefone Error: ' + error.message);
			});
		}

		loadSocialNetwork = async () => {
		await api.get(`/api/RedeSocials/GetRedeSocialByCLiente?id=${this.state.ID_Cliente}`, {
				headers: this.handleHeaders(),
			}).then(res => {
				this.setState({socialNetwork: res.data});

				this.loadSocialNetworkData();
				console.log(res.data);
			}
			).catch(error => {
				console.log('RedeSocial Error: ' + error.message);
			});
		}
	//#endregion

	//#region LoadData

		handleDate = () => {
			const dataPublicacao = this.state.person.Data_Nascimento.split("T");
			return dataPublicacao[0];
		}

		loadPersonData = () => {
			this.setState({Name: this.state.person.Nome});
			this.setState({LastName: this.state.person.Sobrenome});
			this.setState({CPF: this.state.person.CPF});   
			this.setState({Data_Nascimento: this.handleDate()});  
		}

		loadTelephoneData = () => {
			this.setState({Telefone: this.state.telephone.Numero})
		}

		loadSocialNetworkData = () => {
			this.setState({Email: this.state.socialNetwork.Email});
		}
	//#endregion

	//#region submits
		handlePersonSubmit = async event => {
			event.preventDefault();
	
			const pResponse = await api.put(`api/Pessoas/${this.state.person.ID_Pessoa}`, {
				"ID_Pessoa": this.state.person.ID_Pessoa,    
				"CPF": this.state.CPF,
				"Nome": this.state.Name,
				"Sobrenome": this.state.LastName,
				"Desconto": this.state.person.Desconto,
				"Tipo_pessoa": this.state.person.Tipo_pessoa,
				"sexo": this.state.person.sexo,
				"Data_Nascimento": this.state.Data_Nascimento,
				"Id_cli": this.state.person.Id_cli,
			}, {
				headers: this.handleHeaders(),
			}).catch(error => {
				console.log("PersonSubmit Error: " + error.message);
			});

			const tResponse = await api.put(`api/Telefones/${this.state.telephone.ID_Telefone}`, {
					"ID_Telefone": this.state.telephone.ID_Telefone,
					"Tipo_Telefone": this.state.telephone.Tipo_Telefone,
					"Numero": this.state.Telefone,
					"Id_c": this.state.telephone.Id_c
			}, {
				headers: this.handleHeaders(),
			}).catch(error => {
				console.log("TelephoneSubmit Error: " + error.message);
			});

			const sResponse = await api.put(`api/RedeSocials/${this.state.socialNetwork.ID_RedeSocial}`, {
				"ID_RedeSocial": this.state.socialNetwork.ID_RedeSocial,    
				"email": this.state.Email,
				"Id_cli": this.state.ID_Cliente,
			}, {
				headers: this.handleHeaders(),
			}).catch(error => {
				console.log("SocialNetworkSubmit Error: " + error.message);
			});

			if (tResponse.status === 204 && pResponse.status === 204 && sResponse.status === 204) {
				this.setState({isStopped: false});
				this.handleAnimationPopUp("success");
				setTimeout(() => {
					this.setState({isStopped: true});
				}, 3000);
				} else {
				this.setState({isStopped: false});
				this.handleAnimationPopUp("error");
				setTimeout(() => {
						this.setState({isStopped: true});
				}, 3000);
			}
		}  

		handlePasswordSubmit = async event => {
			event.preventDefault();
	
			if (this.state.OldPassword === this.state.user.Senha && this.state.matchPassword) {
				await api.put(`api/Logins/${this.state.user.ID_Login}`, {
				"ID_Login": this.state.user.ID_Login,    
				"Usuario": this.state.user.Usuario,
				"Senha": this.state.NewPassword,
				"cliente": this.state.user.cliente,
				}).then(res => {
					this.loadLogin();
					console.log(res.data);

					this.setState({isStopped: false});
					this.handleAnimationPopUp("success");
					setTimeout(() => {
						this.setState({isStopped: true});
					}, 3000);
				}).catch(error => {
					console.log("PersonSubmit Error: " + error.message);

					this.setState({isStopped: false});
					this.handleAnimationPopUp("error");
					setTimeout(() => {
						this.setState({isStopped: true});
					}, 3000);
				});
			} else {
				console.log('Verifique suas senhas');
			}
		}
	//#endregion

	componentDidMount() {
		this.handlePageColor(2);
		this.loadLogin();
	}
      
	handlePageColor = (item = 0) => {
		let pageElement = document.querySelectorAll('.pages');
		let textElement = document.querySelectorAll('.pages a');

		pageElement[item].style.backgroundColor = '#FFF5B3';
		textElement[item].style.color = "#2F99AC";
	}

	//#region HandleAnimationPopUp
      showAnimationPopUp = (element="") => {
        document.querySelector(`.putPopUp.${element}`).style.display = "block";
      }
      
      hideAnimationPopUp = (element="") => {
        document.querySelector(`.putPopUp.${element}`).style.display = "none";
      }
    
      handleAnimationPopUp = (element = "") => {
        this.showAnimationPopUp(element);
        setTimeout(() => {
          this.hideAnimationPopUp(element);
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

		//#region eyeStyles
			const eyeImg = {
				width: '1.5%',
				height: 'auto',
				position: 'absolute',
				top: '1036px', left: '970px', right: '0px', bottom: '0px',
				cursor: 'pointer',
			}
			
			const eyeImg2 = {
				width: '1.5%',
				height: 'auto',
				position: 'absolute',
				top: '1121px', left: '970px', right: '0px', bottom: '0px',
				cursor: 'pointer',
			}
			
			const eyeImg3 = {
				width: '1.5%',
				height: 'auto',
				position: 'absolute',
				top: '1207px', left: '970px', right: '0px', bottom: '0px',
				cursor: 'pointer',
			}
		//#endregion

		const passwordDiv = {
			position: 'absolute',
			top: '1075px', left: '795px', right: '0px', bottom: '0px',
			color: 'red',
			fontSize: '14px', 
			fontWeight: '300',
			display: 'none',
		}

    	return (

        	<div className="myaccount-wrapper">

            <Header />

            <div className="myaccount-container">
                
					<div className="left-info">

						<UserInfo />
						<AccountPages />

					</div>

					<div className="middle-wrapper">

					<div className="middle-content">

							<h2>Minha Conta</h2>
							<p>Visualize e edite suas informações pessoais.</p>

							<div className="line" />

							<div className="user-info">

                          <h3>Dados:</h3>

                          <form onSubmit={this.handlePersonSubmit}>
                              <ul>

                                  <li>
                                      <label htmlFor="name">Nome</label>
                                      <input type="text" id="name"
                                      required
                                      defaultValue={this.state.Name} 
                                      onChange={e => this.setState({Name: e.target.value})}
                                      onFocus={e => e.target.select()}
                                      />
                                  </li>

                                  <li>
                                      <label htmlFor="lastName">Sobrenome</label>
                                      <input type="text" id="LastName" required
                                      defaultValue={this.state.LastName} 
                                      onChange={e => this.setState({LastName: e.target.value})}
                                      onFocus={e => e.target.select()}
                                      />
                                  </li>

                                  <li>
                                      <label htmlFor="email">Email</label>
                                      <input type="email" id="email" readOnly style={{cursor: 'default', paddingLeft: '2px'}}
                                        value={this.state.Email}
                                      />
                                  </li>

                                  <li>
                                      <label htmlFor="data-nascimento">Data de Nascimento</label>
                                      <input type="date" id="data-nascimento"
                                        defaultValue={this.state.Data_Nascimento}
                                        onChange={e => this.setState({Data_Nascimento: e.target.value})}
                                      />
                                  </li>

                                  <li>
                                      <label htmlFor="cpf">CPF</label>
                                      <input type="text" id="cpf" readOnly style={{cursor: 'default'}}
                                        value={this.state.CPF}
                                      />
                                  </li>

                                  <li>
                                      <label htmlFor="telephone">Telefone</label>
                                      <input type="text" id="telephone"
                                        defaultValue={this.state.Telefone}
                                        onChange={e => this.setState({Telefone: e.target.value})}
                                        onFocus={e => e.target.select()} 
                                      />
                                  </li>
                              </ul>

                              <button type="submit">Atualizar</button>

                          </form>
                      </div>
					
					</div>
                
                  <div className="middle-content i2">

                      <h3>Senha:</h3>

                      <div className="line" />

                      <div className="user-info">

                          <form onSubmit={this.handlePasswordSubmit}>
                              <ul>
                                  <li>
                                      <label htmlFor="new-password">Nova Senha:</label>
                                      <input type="password" id="new-password"
                                        required
                                        defaultValue={this.state.NewPassword} 
                                        onChange={e => this.handlePasswordVerification(e)}
                                      />
                                      <img src={eye} alt="" draggable="false" style={eyeImg} onMouseDown={() => this.handlePasswordVision('#new-password', 0)} onMouseUp={() => this.handlePasswordVision('#new-password', 0)}/>
                                  </li>
                                  <li>
                                      <label htmlFor="confirm-password">Confirmar Senha:</label>
                                      <input type="password" id="confirm-password"
                                        autoComplete="nope"
                                        required
													 defaultValue={this.state.ConfirmPassword}
													 onChange={e => this.handleConfirmPasswordVerification(e)}
                                      />
                                      <img src={eye} alt="" style={eyeImg2} 
                                        draggable="false" 
                                        onMouseDown={() => this.handlePasswordVision('#confirm-password', 1)} 
                                        onMouseUp={() => this.handlePasswordVision('#confirm-password', 1)}
                                      />
                                  </li>
                                  <div className="password-warning" style={passwordDiv}>As senhas estão diferentes</div>
                                  <li>
                                      <label htmlFor="old-password">Senha Antiga: </label>
                                      <input type="password" id="old-password"
                                        required
                                        value={this.state.OldPassword}
                                        onChange={e => this.setState({OldPassword: e.target.value})}
                                      />
                                      <img src={eye} alt="" style={eyeImg3} 
                                        draggable="false" 
                                        onMouseDown={() => this.handlePasswordVision('#old-password', 2)} 
                                        onMouseUp={() => this.handlePasswordVision('#old-password', 2)}
                                      />
                                  </li>
                              </ul>

                              <button type="submit">Mudar Senha</button>

                          </form>
                      </div>
                  </div>
                
                </div>

            </div>

            <div className="putPopUp success">
              <Lottie options={okAnimation}
                height={100}
                width={100}
                isStopped={this.state.isStopped}
              />
              <h1>Informações atualizadas com sucesso</h1>
          </div>

          <div className="putPopUp error">
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
