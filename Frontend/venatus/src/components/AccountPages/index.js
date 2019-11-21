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
                    <li className="pages item-1"><Link to="/orders">Meus Pedidos</Link></li>
                    <li className="pages item-2"><Link to="/addressess">Meus Endereços</Link></li>
                    <li className="pages item-3"><Link to="/account">Minha Conta</Link></li>
                </ul>

            </div>
        </>
    );
  }
}
