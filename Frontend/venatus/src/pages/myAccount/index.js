import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import './styles.css';
import userAvatar from '../../assets/myAccount/silhueta.png';
import editAvatar from '../../assets/myAccount/lapis.svg';

export default class myAccount extends Component {
  render() {
    return (

        <div className="myaccount-container">
            
            <div className="left-content">

                <div className="user-content">
                    <img id="avatar" src={userAvatar} alt="Avatar do usuário"/>
                    {/* <button>
                        <img id="pencil" src={editAvatar} alt="Editar avatar"/>
                    </button> */}
                    <p>Jander Silva</p>
                </div>

                <div className="account-pages">
                    <ul>
                        <li className="pages item-1"><Link>Meus Pedidos</Link></li>
                        <li className="pages item-2"><Link>Meus Endereços</Link></li>
                        <li className="pages item-3"><Link>Minha Conta</Link></li>
                    </ul>
                </div>
            </div>


        </div>
    );
  }
}
