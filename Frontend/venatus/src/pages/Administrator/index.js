import React, { Component } from 'react';
import Lottie from 'react-lottie';

import Dashboard from '../../components/Dashboard';

import './styles.css';
import Logo from '../../assets/header/logo.svg'
import AdminAnimation from '../../assets/Animations/administrator.json';

export default class Administrator extends Component {

    state = {
    }

  render() {

    const AnimationSettings = {
        loop: true,
        autoplay: true, 
        animationData: AdminAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className="administrator-wrapper">

            <Dashboard />

            <div className="bookStorage-warning">

            </div>
            
            <div className="administrator-container">

                <img src={Logo} alt="Logo Venatus"/>

                <h1>Bem-Vindo ao Painel do Administrador</h1>

                <div className="administrator-animation">
                    <Lottie options={AnimationSettings}
                        height={250}
                        width={250}
                        isStopped={this.state.isStopped}
                    />
			    </div>

            </div>
            
        </div>
    );
  }
}
