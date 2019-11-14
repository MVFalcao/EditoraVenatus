import React, { Component } from 'react';
import api from '../../../services/api';
import Lottie from 'react-lottie';

import Header from '../../../components/Header';
import AccountPages from '../../../components/AccountPages';
import UserInfo from '../../../components/UserInfo';

import './styles.css';
import OkAnimation from '../../../assets/Animations/OkPopUp.json';
import ErrorAnimation from '../../../assets/Animations/ErrorPopUp.json';

export default class myAccount extends Component {

    state = {
      Name: '',
      LastName: '',
      CPF: '',
      Telefone: '',

      id_Cliente: 0,
      user: [],
      person: [],
      telephone: [],

      isStopped: true,
    }

      loadLogin = async () => {
        const jwt = localStorage.getItem("jwt");
        await api.get('api/getToken', { headers: { "jwt": jwt }}).then(response => {
            this.setState({ user: response.data});
            this.setState({id_Cliente: this.state.user.cliente})
            
            this.loadPerson();
            this.loadTelephone();
            console.log(response.data);
        }
        ).catch(error => {
            console.log('Token Error: ' + error.message);
        });
      }
    
      loadPerson = async () => {
        await api.get(`/api/Pessoas/${this.state.id_Cliente}`).then(response => {
            this.setState({ person: response.data});

            this.loadPersonData();
            console.log(response.data);
        }
        ).catch(error => {
            console.log('Pessoa Error: ' + error.message);
        });
      }

      loadTelephone = async () => {
        await api.get(`/api/Telefones/GetTelefoneByCliente?id=${this.state.id_Cliente}`).then(response => {
            this.setState({ telephone: response.data});

            this.loadTelephoneData();
            console.log(response.data);
            
        }
        ).catch(error => {
            console.log('Telefone Error: ' + error.message);
        });
      }

      loadPersonData = () => {
        this.setState({Name: this.state.person.Nome});
        this.setState({LastName: this.state.person.Sobrenome});
        this.setState({CPF: this.state.person.CPF});        
      }

      loadTelephoneData = () => {
          this.setState({Telefone: this.state.telephone.Numero})
      }

      handleSubmit = async event => {
        event.preventDefault();
    
       const pResponse = await api.put(`api/Pessoas/${this.state.person.ID_Pessoa}`, {
            "ID_Pessoa": this.state.person.ID_Pessoa,    
            "CPF": this.state.CPF,
            "Nome": this.state.Name,
            "Sobrenome": this.state.LastName,
            "Desconto": this.state.person.Desconto,
            "Tipo_pessoa": this.state.person.Tipo_pessoa,
            "sexo": this.state.person.sexo,
            "Data_Nascimento": this.state.person.Data_Nascimento,
            "Id_cli": this.state.person.Id_cli,
        }).catch(error => {
            console.log("PersonSubmit Error: " + error.message);
        });

       const tResponse = await api.put(`api/Telefones/${this.state.telephone.ID_Telefone}`, {
            "ID_Telefone": this.state.telephone.ID_Telefone,
            "Tipo_Telefone": this.state.telephone.Tipo_Telefone,
            "Numero": this.state.Telefone,
            "Id_c": this.state.telephone.Id_c
        }).catch(error => {
            console.log("TelephoneSubmit Error: " + error.message);
        });
        
        if (tResponse.status === 204 && pResponse.status === 204) {
            this.setState({isStopped: false});
            this.handlePopUp("success");
            setTimeout(() => {
              this.setState({isStopped: true});
            }, 3000);
        } else {
            this.setState({isStopped: false});
            this.handlePopUp("error");
            setTimeout(() => {
                this.setState({isStopped: true});
            }, 3000);
        }
      }

      handlePageColor = (item = 0) => {
        let pageElement = document.querySelectorAll('.pages');
        let textElement = document.querySelectorAll('.pages a');

        pageElement[item].style.backgroundColor = '#FFF5B3';
        textElement[item].style.color = "#2F99AC";
      }

      componentDidMount() {
          this.handlePageColor(2);
          this.loadLogin();
      }

      showPopUp = (element="") => {
        document.querySelector(`.putPopUp.${element}`).style.display = "block";
      }
      
      hidePopUp = (element="") => {
        document.querySelector(`.putPopUp.${element}`).style.display = "none";
      }
    
      handlePopUp = (element = "") => {
        this.showPopUp(element);
        setTimeout(() => {
          this.hidePopUp(element);
        }, 3000);
      }

  render() {

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

    return (
        <div className="myaccount-wrapper">

            <Header />

            <div className="myaccount-container">
                
                <div className="left-info">

                    <UserInfo />
                    <AccountPages />

                </div>

                <div className="middle-content">

                    <h2>Minha Conta</h2>
                    <p>Visualize e edite suas informações pessoais.</p>

                    <div className="line" />

                    <div className="user-info">

                        <h3>Dados:</h3>

                        <form onSubmit={this.handleSubmit}>
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
