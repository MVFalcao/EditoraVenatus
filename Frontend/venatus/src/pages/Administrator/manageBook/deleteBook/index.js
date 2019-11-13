import React, { Component } from 'react';
import api from '../../../../services/api';
import Lottie from 'react-lottie';

import Dashboard from '../../../../components/Dashboard';

import './styles.css';
import OkAnimation from '../../../../assets/Animations/OkPopUp.json';

export default class editBook extends Component {

  state = {
    allBooks: [],

    isStopped: true,
  }

  async loadBooks() {
    const response = await api.get('/api/Livros').catch(function (error) {
      console.log('Error: ' + error.message);
    });
    if (response != null) {
      console.log(response);
      this.setState({allBooks: response.data});
    }
  }

  async deleteBook(ID_Livro = 0) {
    const response = await api.delete(`/api/Livros/${ID_Livro}`).catch(function(error) {
      console.log('Error: ' + error.message);
    });
    if (response != null) {
      this.setState({isStopped: false});
      this.handlePopUp();
      this.loadBooks();
      setTimeout(() => {
        this.setState({isStopped: true});
      }, 3000);
    }
  }

  handleDeleteBook = (ID_Livro = 0, index = 0) => {
    let confirmDelete = window.confirm(`Deseja realmente deletar o livro ${this.state.allBooks[index].Titulo} ${this.state.allBooks[index].SubTitulo}?`);
    if (confirmDelete) this.deleteBook(ID_Livro);
    else return;
  }

  //#region HandlePopUp() {
  showPopUp = () => {
      document.querySelector('.deletePopUp').style.display = "block";
  }
  
  hidePopUp = () => {
    document.querySelector('.deletePopUp').style.display = "none";
  }

  handlePopUp = () => {
    this.showPopUp();
    setTimeout(() => {
      this.hidePopUp();
    }, 3000);
  }
  //#endregion

  componentDidMount() {
    this.loadBooks();
  }

  render() {

    const defaultOptions = {
      loop: false,
      autoplay: false, 
      animationData: OkAnimation,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    return (
        <div className="selectBook-wrapper">
          <Dashboard />
          <div className="selectBook-container">

            <h1>Selecione o livro a ser deletado</h1>

            <ul>
              {this.state.allBooks.map((book, index) => (
                <li key={book.ID_Livro}>
                  <button onClick={() => this.handleDeleteBook(book.ID_Livro, index)}>
                    <img src={book.Imagem_URL} alt={book.Titulo}/>
                    <h2>{book.Titulo} {book.SubTitulo}</h2>
                  </button>
                </li>
              ))}
            </ul>

            <div className="deletePopUp">
              <Lottie options={defaultOptions}
                height={100}
                width={100}
                isStopped={this.state.isStopped}
              />
              <h1>Livro Apagado com sucesso</h1>
            </div>
          </div>
        </div>
    );
  }
}
