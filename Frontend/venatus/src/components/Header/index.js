import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/header/logo.svg';
import carrinho from '../../assets/header/carrinho.svg';
import line from '../../assets/header/linha.svg';
import "./styles.css";

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

const Header = () => {
    return <header id = "main-header">
        <div className="header-logo">
            <Link to="/">
                <img src={logo} alt= "Venatus" />
            </Link>
            <div className="header-login">
                <Link to="/Login">Entre ou Cadastre-se</Link>
            </div>
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
                    <Link to="/">Sobre Nós</Link>
                </div>
                <div className="item item-3">
                    <Link to="/events">Eventos</Link>
                </div>
                <div className="item item-4">
                    <Link to="/">Contato</Link>
                </div>
                <div className="item-cart">
                    <Link to='/'>
                        <img src={carrinho} alt="Carrinho" />
                        <div className="cart-background">0</div>
                    </Link>
                </div>
            </div>
            <div className="header-line">
                <img src={line} alt="line1" />
            </div>
        </div>
    </header>
};

export default Header;