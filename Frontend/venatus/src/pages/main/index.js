import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './styles.css';
import nya from '../../assets/main/nya.svg';
import faixa_azul from '../../assets/main/faixa_azul.svg';

export default class main extends Component {
  render() {
    return (
      <>
      <Header />
      <div className="main-container">
        <h1>Últimos Lançamentos</h1>
        <div className="main-background">
          <section className="main-content">
              <ul>
                <li>
                  <Link to="/bookPage">
                    <img src={nya} alt="Descrição do Livro" />
                  </Link>
                  <h2>Nya - #ConexãoPulmãoVerde</h2>
                  <p>R$ 39,90</p>
                  <Link to="/bookPage" id="BookBtn">Saiba mais</Link>
                </li>
              </ul> 
          </section>
        </div>
        <div className="about-venatus">
          <h1>Sobre Venatus</h1>
          <p>Lorem ipsum vel bibendum pharetra sed ut feugiat massa eget accumsan mauris primis, habitant dui cras mauris tellus ligula dictum neque cursus ligula vitae. luctus sit habitasse a luctus vitae tristique torquent amet libero purus justo, varius nec aliquam tortor nisl diam dui risus eros arcu donec fusce, ut sagittis augue etiam est inceptos ante sollicitudin felis fames.</p>
          <div className="about-line">
            <img src={faixa_azul} alt="Faixa Azul" />
          </div>
        </div>
      </div>
      <Footer />
      </>
    );
  }
}
