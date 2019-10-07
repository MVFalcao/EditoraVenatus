import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/header/logo.svg';
import carrinho from '../../assets/header/carrinho.svg';
import line from '../../assets/header/linha.svg';
import "./styles.css";

const Header = () => {
    return <header id = "main-header">
        <div className="header-logo">
            <a href="">
                <img src={logo} alt= "Venatus" />
            </a>
            <div className="header-login">
                <a href="/">Entre ou Cadastre-se</a>
            </div>
        </div>
        <div className="menu-container">
            <div className="header-line">
                <img src={line} alt="line1" />
            </div>
            <div className="menu-navbar">
                <div className="item item-1">
                    <a href="/">Livros</a>
                </div>
                <div className="item item-2">
                    <a href="/">Sobre Nós</a>
                </div>
                <div className="item item-3">
                    <a href="/">Eventos</a>
                </div>
                <div className="item item-4">
                    <a href="/">Contato</a>
                </div>
                <div className="item-cart">
                    <a href='/'>
                        <img src={carrinho} alt="Carrinho" />
                        <div className="cart-background">0</div>
                    </a>
                </div>
            </div>
            <div className="header-line">
                <img src={line} alt="line1" />
            </div>
        </div>
    </header>
};

export default Header;