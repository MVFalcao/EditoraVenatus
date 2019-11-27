import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './styles.css';

export default class allEvents extends Component {

	loadEvents = () => {

	}
	
	render() {
  		return (
      	<div className="event-wrapper">
            
				<Header />
        		
				<div className="event-container">
            
					<h1>Evento mais recente</h1>
            
					<div className="recentEvent-container">

                	<div className="recent-event">

                    	<Link to="/">
								<img src="https://ericafalcaoescritora.files.wordpress.com/2019/06/img-20190528-wa0039.jpg" alt="Evento mais recente"/>
                    	</Link>
                    	<h2>Lançamento Livro Nya - Livraria Cultura</h2>
                    <p>09 de Junho de 2019</p>
                    <Link to="/" id="know-more">Saiba Mais</Link>

						</div>

					</div>

            	<div className="events-list">

                	<h1>Todos os eventos</h1>
                
					 	<ul>
                    
						  	<li>
								<Link to="/">
                            <img src="https://ericafalcaoescritora.files.wordpress.com/2019/10/img-20190929-wa0054.jpg?w=1024" alt="Evento 2"/>
                        </Link>
                        <h3>Semana da Criança - Escola Mais Perfil</h3>
                        <p>09 de Outubro de 2019</p>
                        <Link to="/" className="know-more">Saiba Mais</Link>
                    	</li>
                    
						  	<li>
                        <img src="https://ericafalcaoescritora.files.wordpress.com/2019/10/img-20190919-wa0036.jpg?w=600&h=450" alt="Evento 2"/>
                        <h3>Abertura da FLICA 2019</h3>
                        <p>19 de Setembro de 2019</p>
                        <Link to="/" className="know-more">Saiba Mais</Link>
                    	</li>

                    <li>
                        <img src="https://ericafalcaoescritora.files.wordpress.com/2019/08/img_20190713_195137_157.jpg?w=612&h=&zoom=2" alt="Evento 2"/>
                        <h3>Café Literário na Livraria Saraiva – Blog Literário Estante da Mandy</h3>
                        <p>13 de Julho de 2019</p>
                        <Link to="/" className="know-more">Saiba Mais</Link>
                    </li>
                    <li>
                        <img src="https://ericafalcaoescritora.files.wordpress.com/2019/08/img-20190516-wa0053.jpg?w=591&h=&crop=1&zoom=2" alt="Evento 2"/>
                        <h3>Oficina Criativa – Livraria Mãe que Lê</h3>
                        <p>13 de Julho de 2019</p>
                        <Link to="/" className="know-more">Saiba Mais</Link>
                    </li>
                	</ul>
                
            </div>

        </div>
        <Footer />
      </div>
  );
}
}
