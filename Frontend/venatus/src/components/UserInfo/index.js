import React, { Component } from 'react';
import api from '../../services/api';

import'./styles.css';
import userAvatar from '../../assets/myAccount/silhueta.png';
import editAvatar from '../../assets/myAccount/lapis.svg';

export default class UserInfo extends Component {

  state = {
    ID_Cliente: localStorage.getItem("ID_Cliente"),

    user: [],
    person: [],
  }

  loadPerson = async () => {
    const jwt = localStorage.getItem("jwt");
    const headersData = {
      'Content-Type': 'application/json',
      "jwt": jwt,
    }

    await api.get(`/api/Pessoas/${this.state.ID_Cliente}`, {
      headers: headersData,
    }).then(response => {
        this.setState({ person: response.data});
        // console.log(response.data);
    }
    ).catch(error => {
        console.log('Pessoa Error: ' + error.message);
    });
  }

  componentDidMount() {
    this.loadPerson();
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
