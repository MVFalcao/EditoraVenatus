import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './styles.css';


export default function events() {
  return (
      <div className="event-wrapper">
            <Header />
        <div className="event-container">
            <h1>Evento mais recente</h1>
            <div className="recent-event">
                <Link to="/">
                    <img src="https://ericafalcaoescritora.files.wordpress.com/2019/06/img-20190528-wa0039.jpg" alt="Evento mais recente"/>
                </Link>
                <h2>Lançamento Livro Nya - Livraria Cultura</h2>
                <p>09 de Junho de 2019</p>
                <Link to="/" id="know-more">Saiba Mais</Link>
            </div>
            <div className="events-list">
                <ul>
                    <li>
                        <img src="https://ericafalcaoescritora.files.wordpress.com/2019/10/img-20190929-wa0054.jpg?w=1024" alt="Evento 2"/>
                        <h3>Semana da Criança - Escola Mais Perfil</h3>
                        <p>09 de Outubro de 2019</p>
                        <Link to="/">Saiba Mais</Link>
                    </li>
                </ul>
                
                
            </div>
        </div>
        <Footer />
      </div>
  );
}
