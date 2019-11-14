import React, { Component } from 'react';
import api from '../../services/api';

import'./styles.css';
import userAvatar from '../../assets/myAccount/silhueta.png';
import editAvatar from '../../assets/myAccount/lapis.svg';

export default class UserInfo extends Component {

  state = {
    ID_Cliente: 0,

    user: [],
    person: [],
  }

  loadLogin = async () => {
    const jwt = localStorage.getItem("jwt");
    await api.get('api/getToken', { headers: { "jwt": jwt }}).then(response => {
        this.setState({user: response.data});
        this.setState({ID_Cliente: this.state.user.cliente})
        
        this.loadPerson();
    }
    ).catch(error => {
        console.log('Token Error: ' + error.message);
    });
  }

  loadPerson = async () => {
    await api.get(`/api/Pessoas/${this.state.ID_Cliente}`).then(response => {
        this.setState({ person: response.data});
        // console.log(response.data);
    }
    ).catch(error => {
        console.log('Pessoa Error: ' + error.message);
    });
  }

  componentDidMount() {
    this.loadLogin();
  }

  render() {
    return (
        <div className="user-content">
            <img id="avatar" src={userAvatar} alt="Avatar do usuário"/>
            <button>
                <img id="pencil" src={editAvatar} alt="Editar avatar"/>
            </button>
        <p>{this.state.person.Nome} {this.state.person.Sobrenome}</p>
        </div>
    );
  }
}
