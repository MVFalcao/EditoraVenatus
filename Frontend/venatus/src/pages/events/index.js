import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './styles.css';
import RecentEvent from '../../assets/events/evento-recente.jpg'


export default function events() {
  return (
      <div className="event-wrapper">
            <Header />
        <div className="event-container">
            <h1>Evento mais recente</h1>
            <div className="recent-event">
                <img src={RecentEvent} alt="Evento mais recente"/>
                <h2>Lançamento Livro Nya - Livraria Cultura</h2>
                <p>09 de Junho de 2019</p>
                <Link to="/">Saiba Mais</Link>
            </div>
            <div className="events-list">
                <ul>
                    <li>
                        <img src="/" alt="Evento 1"/>
                    </li>
                </ul>
                
                
            </div>
        </div>
        <Footer />
      </div>
  );
}
