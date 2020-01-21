import React, { Component } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import api from '../../services/api';

export default class Graph extends Component {
  
  	state = {
    	w: 0, h: 0,
	 
	 	elements: [],
	 
	 	allBooks: [],
		allAuthors: [],
		Coupons: []
	}
	

	//#region APIcalls
  	loadBooks = async () => {
    	await api.get('api/Livros').then(res => {
      	// console.log(res.data);
			this.setState({allBooks: res.data});
			
			this.loadAuthors();

    	}).catch(error => {
      	console.log('Boooks -> ' + error);
    	});
	}
	 
	loadAuthors = async () => {
		await api.get(`api/Autors`).then(res => {
			console.log(res.data);
			this.setState({allAuthors: res.data});

			this.handleNodes();
		}).catch(function(error) {
			console.log('Authors -> ' + error);   
	  });
	}
	 
	loadCoupons = async () => {
		await api.get(`api/Cupoms`).then(res => {
			console.log(res.data);
			this.setState({allAuthors: res.data});

			this.handleNodes();
		}).catch(function(error) {
			console.log('Authors -> ' + error);   
	  });
	}
	//#endregion

	//#region Nodes&Edges
  	handleNodes = async () => {
		let positionX = 100; let positionY = 100;
		
		const loadBooksNodes = () => {
			for (const book of this.state.allBooks) {
				positionX += 200;
				let node = { 
					data: { 
						id: book.Titulo, 
						label: `${book.Titulo} ${book.SubTitulo}`, 
					}, 
						position: {x: positionX, y: positionY}
				};
				this.setState({elements: this.state.elements.concat(node)});
			}
			console.log(this.state.elements);
		};

		
		const loadAuthorsNodes = () => {
			positionX = 100;
			positionY = 200;
			for (const author of this.state.allAuthors) {
				positionX += 200;
				let node = { 
					data: { 
						id: author.Nome, 
						label: author.Nome, 
					}, 
					position: {
						x: positionX, 
						y: positionY
					},
					classes: 'authors'
				};
				this.setState({elements: this.state.elements.concat(node)});
			}
		}
			
		loadBooksNodes();
		loadAuthorsNodes();
		this.handleEdges();
		console.log(this.state.elements);
	}

	handleEdges = () => {
		let books = this.state.allBooks;

		this.state.allAuthors.forEach(author => {
			for (let i = 0; i < books.length; i++) {
				if (author.ID_Autor === books[i].Id_autor) {
					let edge = { 
						data: { 
							source: author.Nome, 
							target: books[i].Titulo, 
							label: `Aresta do autor ${author.Nome} para Livro ${books[i].Titulo}`,
						}
					};
					this.setState({elements: this.state.elements.concat(edge)});
				}
			}
		});
	}
	//#endregion

  	componentDidMount = () => {
    	this.setState({
      		w: window.innerWidth,
      		h: window.innerHeight
		});
		
		this.setUpListeners();
		this.loadBooks();
  	}
  
	setUpListeners = () => {
		this.cy.on('click', 'node', (event) => {
			console.log(event.target);
		});
	}
  
  render() {

	const styles = [
			{
			  selector: 'node',
			  style: {
				width: 30,
				height:30,

				borderWidth: 2,
				borderColor: 'cyan',
				backgroundColor: '#606060',

				content: 'data(label)',
				color : 'black',
				textOpacity: 1,
				fontFamily: 'Bahnschrift',
				fontSize: '12px',
				fontWeight: '300',
				textMaxWidth: '10px',
				textValign: 'top',
				textHalign: 'center',
			  }
			},
			{
				selector: '.authors',
				style: {
					width: 27,
					height: 27,

					shape: 'rectangle',

					fontSize: '12px',
					borderColor: 'orange',
				}
			},
			{
			  selector: 'edge',
			  style: {
				width: 5,
			  }
			}
	]

	const layout = {
		name: 'cose',
  		ready: function(){},
  		stop: function(){},
  		animate: true,
  		animationEasing: undefined,
  		animationDuration: undefined,
  		animateFilter: function ( node, i ){ return true; },
  		animationThreshold: 250,
  		refresh: 20,
		fit: true,
		padding: 30,
		boundingBox: undefined,
		nodeDimensionsIncludeLabels: false,
		randomize: false,
		componentSpacing: 40,
		nodeRepulsion: function( node ){ return 2048; },
		nodeOverlap: 4,
		edgeElasticity: function( edge ){ return 32; },
		nestingFactor: 1.2,
		gravity: 1,
		numIter: 1000,
		initialTemp: 1000,
		coolingFactor: 0.99,
		minTemp: 1.0
	};

	return (
		<>
        	<CytoscapeComponent
				elements={this.state.elements}
				stylesheet={styles}
            	style={{ width: this.state.w, height: this.state.h}}
				layout={layout}
				cy={(cy) => {this.cy = cy}}
        	/>
		</>
    );
  }
}