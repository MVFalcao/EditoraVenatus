import React, { Component } from 'react';
import Lottie from 'react-lottie';
import api from '../../services/api';

import Dashboard from '../../components/Dashboard';

import './styles.css';
import Logo from '../../assets/header/logo_n.svg';
import AdminAnimation from '../../assets/Animations/administrator.json';

export default class Administrator extends Component {

    state = {
        Storages: [],

        lowStorage: false,

        jwt: localStorage.getItem("jwt"),
    }

    loadBook = async (ID_Livro=0, index) => {
        await api.get(`api/Livros/${ID_Livro}`, {
            headers: {
                'Content-Type': 'application/json',
                "jwt": this.state.jwt,
            }
        }).then(res => {
            console.log(res.data);
            document.querySelector(`.storage-waring.${index} p`).innerHTML = `Livro ${res.data.Titulo} ${res.data.SubTitulo}: Baixo Estoque`;
        }).catch(error => {
            console.log('loadBook -> ' + error);
        });
    }

    loadStorages = async () => {
        await api.get('api/Estoques').then(res => {
            console.log(res.data);
            this.setState({Storages: res.data});
            this.loadBook();
        }).catch(error => {
            console.log('loadStorages -> ' + error);
            
        });
    }

    componentDidMount() {
        this.loadStorages();
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

            {/* <div className="bookStorage-warning">
                <ul>
                    {this.state.Storages.map((storage, index) => (
                        storage.Quantidade < 10 ?
                            <li className={`storage-waring ${index}`} key={storage.ID_Estoque}>
                                {() => this.loadBook(this,storage.Livro, index)}
                                <p></p>
                            </li>
                        :
                            <></>
                    ))}
                </ul>
            </div> */}
            
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
