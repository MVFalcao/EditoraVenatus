import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import api from '../../services/api';

import "./styles.css";
import logo from '../../assets/header/logo_l.svg';
import line from '../../assets/header/linha.svg';
// import userArrow from '../../assets/main/user-arrow.svg';
// import userArrowBlue from '../../assets/main/user-arrow-blue.svg';
// import out from '../../assets/main/out.svg';

// function paintActualTab() {
//     let actualTab;    

//     switch(window.location.pathname) {
//         case "/allBooks":
//             actualTab = document.querySelector('.item.item-1 a');
//             actualTab.style.color = "#309AAC";    
//         break;
//         default:
//             actualTab = document.querySelectorAll('.item a');
//             actualTab.forEach(element => {
//                 element.style.color = "#535151"
//             }); 
//     }
// }

export default class Header extends Component {

    state = {
        user: [],
        
        isLogged: false,
        isClosed: true,
        isOver: false,
        redirect: false,
    }

    async componentDidMount() {
        const jwt = localStorage.getItem("jwt");
        await api.get('api/getToken', { headers: { "jwt": jwt }}).then(response => {
            this.setState({ user: response.data});
            this.setState({ isLogged: true});
            
            // console.log(response.data);
        }).catch(error => {
            console.log('Token Error: ' + error.message);
        });

        // this.handleCloseTab();
    }

    // handleCloseTab = () => {
    //     window.addEventListener("beforeunload", event => {  
    //         event.preventDefault();
    //         localStorage.removeItem("jwt");
    //     });
    // }

    //#region HeaderLogin
    // handleArrow = () => {
    //     if (this.state.isOver) {
    //         document.querySelector('.header-login img').src = userArrow;
    //         this.setState({isOver: false});
    //     } else {
    //         document.querySelector('.header-login img').src = userArrowBlue;
    //         this.setState({isOver: true});
    //     }
    // }

    // handleDropdown = () => {
    //     let accountDropdown = document.querySelector('.account-dropdown');
    //     let divHide = document.querySelector('.hide-menu');
        
    //     const show = () => {
    //         divHide.style.display = "block";
    //         accountDropdown.style.display = "block";
    //         this.setState({isClosed: false});
    //     }

    //     const hide = () => {
    //         divHide.style.display = "none";
    //         accountDropdown.style.display = "none";
    //         this.setState({isClosed: true});
    //     }

    //     if (this.state.isClosed) {
    //         show();
    //     } else {
    //         hide();
    //     } 
    // }
    
    // hidebyDiv = () => {
    //     document.querySelector('.hide-menu').style.display = "none";
    //     document.querySelector('.account-dropdown').style.display = "none";
    //     this.setState({isClosed: true});
    // }

    // handleLogoff = () => {
    //     localStorage.removeItem("jwt");
    //     if (window.location.href === "http://localhost:3000/") {
    //         window.location.reload();
    //     } else {
    //         this.setState({redirect: true});
    //     } 
    // }
    //#endregion

    render() {

        if (this.state.redirect) return <Redirect to='/' />;

        // const hideMenu = {
        //     width: '100%', 
        //     minHeight: "900px",
        //     position: "fixed",
        //     display: "none",
        //     top: "0px",
        // }

        return (
            <>

            {/* <div className="hide-menu" style={hideMenu} onClick={this.hidebyDiv} /> */}

            <header className="main-header">

                <div className="header-logo">

                    <Link to="/">
                        <img src={logo} alt= "Venatus" />
                    </Link>
                    

                    {/* <div className="header-login">
                    
                        { this.state.isLogged ?
                            <>

                                <button onClick={() => this.handleDropdown()} onMouseOver={this.handleArrow} onMouseOut={this.handleArrow}>
                                    <p>{this.state.user.Usuario}</p>
                                    <img src={userArrow} alt="seta" />    
                                </button>

                                <div className="account-dropdown">

                                    <ul>
                                        <li>
                                            <Link to="/orders">Meus Pedidos</Link>
                                        </li>

                                        <li>
                                            <Link to="/addressess">Meus Endereços</Link>
                                        </li>

                                        <li>
                                            <Link to="/account">Minha Conta</Link>
                                        </li>

                                        <div className="line" />

                                        <li>
                                            <button id="logoff" onClick={() => this.handleLogoff()}>
                                                <p>Sair</p>
                                                <img src={out} alt="sair"/>    
                                            </button>
                                        </li>

                                    </ul>

                                </div>

                            </>

                        :

                            <Link to="/Login">Entre ou Cadastre-se</Link>
                        
                        }
                    </div> */}

                </div>

                <div className="menu-container">

                    <div className="header-line">
                        <img src={line} alt="line1" />
                    </div>
                    
                    <div className="menu-navbar">
                        <div className="item item-1">
                            <Link to="/allBooks">Livros</Link>
                        </div>
                        <div className="item item-2">
                            <Link to="/aboutus">Editora</Link>
                        </div>
                        <div className="item item-3">
                            <Link to="/events">Eventos</Link>
                        </div>
                        <div className="item item-4">
                            <Link to="/contactus">Fale Conosco</Link>
                        </div>
                    </div>
                    <div className="header-line">
                        <img src={line} alt="line1" />
                    </div>
                </div>
            </header>
            </>
            );
        };
    }