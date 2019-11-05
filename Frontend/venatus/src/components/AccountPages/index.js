import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

export default class AccountPages extends Component {
    state={userAvatar: ''}

  render() {
    return (  
        <>
            <div className="account-pages">

                <ul>
                    <li className="pages item-1"><Link to="/">Meus Pedidos</Link></li>
                    <li className="pages item-2"><Link to="/adressess">Meus Endereços</Link></li>
                    <li className="pages item-3"><Link to="/myaccount">Minha Conta</Link></li>
                </ul>

            </div>
        </>
    );
  }
}
