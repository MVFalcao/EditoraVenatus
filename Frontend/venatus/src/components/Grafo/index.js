import React, { Component } from 'react';
import api from '../../services/api';

import CytoscapeComponent from 'react-cytoscapejs';
// import Cytoscape from 'cytoscape';
// import CoseBilkent from 'cytoscape-cose-bilkent';

// Cytoscape.use( CoseBilkent );

export default class Demo extends Component {
  
  state = {
    w: 0,
	 h: 0,
	 
	 elements: [],
	 
	 allBooks: [],
	 allAuthors: [],
  }

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
				let node = { data: { id: author.Nome, label: author.Nome }, position: {x: positionX, y: positionY} };
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
			console.log(event.target)
		});
	}
  
  render() {

	const layout = {
		name: 'random',
	};

	return(
        	<CytoscapeComponent
				elements={this.state.elements}
            style={{ width: this.state.w, height: this.state.h }}
				layout={layout}
				cy={(cy) => {this.cy = cy}}
        	/>
    );
  }
}