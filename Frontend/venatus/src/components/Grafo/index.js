import React, { Component } from 'react'
import CytoscapeComponent from 'react-cytoscapejs';
import api from '../../services/api';

export default class Demo extends Component {
  
  state = {
    w: 0,
    h: 0,
    elements: [],
    allBooks: [],
  }

  loadBooks = async () => {
    await api.get('api/Livros').then(res => {
      console.log(res.data);
	  this.setState({allBooks: res.data});
	  this.loadNodes();
    }).catch(error => {
      console.log('Boooks -> ' + error);
    })
  }

  loadNodes = () => {
    for (const book of this.state.allBooks) {
		let a = { data: { id: book.ID_Livro } };
		this.setState({elements: this.state.elements.concat(a)});
	}
	console.log(this.state.elements);
  }

  componentDidMount = () => {
    this.setState({
      w: window.innerWidth,
      h:window.innerHeight
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

    return(
      <div>
        <CytoscapeComponent
            elements={this.state.elements}
            style={{ width: this.state.w, height: this.state.h }}
            cy={(cy) => {this.cy = cy}}
        />
      </div>
    );
  }
}