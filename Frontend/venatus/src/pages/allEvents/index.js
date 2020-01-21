import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './styles.css';

export default class allEvents extends Component {

	state = {
		lastEvent: [],
		allEvents: [],
	}

	loadEvents = async () => {
		await api.get(`api/Eventos`).then(res => {
			console.log(res.data);
			this.setState({allEvents: res.data, lastEvent: res.data[0]});
		}).catch(error => {
      	console.log('Events -> ' + error);
		});
	}

	componentDidMount() {
		this.loadEvents();
	}
	
	render() {

		const lastEvent = this.state.lastEvent;
		const allEvents = this.state.allEvents.slice(1);

  		return (

      		<div className="event-wrapper">
            
				<Header />
        		
				<div className="event-container">
            
					<h1>Evento mais recente</h1>
            
					<div className="recentEvent-container">

                		<div className="recent-event">
						
							<Link to="/">
								<img src={lastEvent.Imagem_URL} alt={lastEvent.Titulo}/>
							</Link>
								<h2>{lastEvent.Titulo} - Livraria Cultura</h2>
								<p>{lastEvent.Data_Evento}</p>
							<Link to="/" id="know-more">Saiba Mais</Link>

						</div>

					</div>

            		<div className="events-list">

                		<h1>Todos os eventos</h1>
                
					 	<ul>
						
							{allEvents.map(event => (
								<li key={event.ID_Evento}>
									<Link to="/">
										<img src={event.Imagem_URL} alt={event.Titulo} />
									</Link>
									<h3>{event.Titulo}</h3>
									<p>{event.Data_Evento} </p>
									<Link to="/" className="know-more">Saiba Mais</Link>
								</li>
							))}
                    
                		</ul>
                
            		</div>

        		</div>

        		<Footer />

      		</div>
  		);
	}
}
