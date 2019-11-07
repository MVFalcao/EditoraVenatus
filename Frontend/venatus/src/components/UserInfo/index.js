import React, { Component } from 'react';

import'./styles.css';
import userAvatar from '../../assets/myAccount/silhueta.png';
import editAvatar from '../../assets/myAccount/lapis.svg';

export default class UserInfo extends Component {
  render() {
    return (
        <div className="user-content">
            <img id="avatar" src={userAvatar} alt="Avatar do usuário"/>
            <button>
                <img id="pencil" src={editAvatar} alt="Editar avatar"/>
            </button>
            <p>Jander Silva</p>
        </div>
    );
  }
}
