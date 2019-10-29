import React, {Component} from 'react';
import api from '../../services/api';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './styles.css';
import AgeL from '../../assets/ageRating/L.svg';
import Age10 from '../../assets/ageRating/10.svg';
import Age12 from '../../assets/ageRating/12.svg';
import Age14 from '../../assets/ageRating/14.svg';
import Age16 from '../../assets/ageRating/16.svg';
import Age18 from '../../assets/ageRating/18.svg';
import ErrorImg from '../../assets/ageRating/Error.svg';



export default class book extends Component {

    state = {
        divClosedList: [true, true, true],
        allBooks: [],
    }
    
    async loadBooks() {
        const response = await api.get(`api/Livros/${this.props.match.params.id}`).catch(function(error) {
            console.log('Algo deu errado ' + error.message);            
        });
        if(response != null) {
            console.log(response);
            this.setState({allBooks: response.data});
        }
    }

    componentDidMount() {
        this.loadBooks();
        this.handleAge();
    }

     handleDiv = (SymbolItem = "", contentDiv = "", item = 0) => {
        let SymbolEmt = document.querySelector(SymbolItem);
        let dropdownContent = document.querySelector(contentDiv);

        const showDiv = () => {
            dropdownContent.style.display = "flex";
        }
        const hideDiv = () => {
            dropdownContent.style.display = "none";
        }
        if (this.state.divClosedList[item]) {
            showDiv();
            SymbolEmt.innerHTML = "-";
            let a = this.state.divClosedList;
            a[item] = false;
            this.setState({divClosedList: a});
            this.handleDivClose(contentDiv);
        } else {
            hideDiv();
            SymbolEmt.innerHTML = "+";
            let a = this.state.divClosedList;
            a[item] = true;
            this.setState({divClosedList: a});
        }
    }

    handleDivClose(contentDiv = "") {
        let SymbolEmtList = document.querySelectorAll('.plus');
        let dropdownContentList = document.querySelectorAll('.dropdown-content');
        let a = this.state.divClosedList;
        
        if (contentDiv === '.dropdown-content.item-1') {
            a[1] = a[2] = true;
            this.setState({divClosedList: a});
            dropdownContentList[1].style.display = dropdownContentList[2].style.display = "none";
            SymbolEmtList[1].innerHTML = SymbolEmtList[2].innerHTML = "+";
        } else if (contentDiv === '.dropdown-content.item-2') {
            a[0] = a[2] = true;
            this.setState({divClosedList: a});
            dropdownContentList[0].style.display = dropdownContentList[2].style.display = "none";
            SymbolEmtList[0].innerHTML = SymbolEmtList[2].innerHTML = "+";
        } else {
            a[0] = a[1] = true;
            this.setState({divClosedList: a});
            dropdownContentList[0].style.display = dropdownContentList[1].style.display = "none";
            SymbolEmtList[0].innerHTML = SymbolEmtList[1].innerHTML = "+";
        }
    }
    
    handleAge() {
        const ageRating = this.state.allBooks.Classificacao_Indicativa;
        const ageText = document.querySelector('p#info01');
        const ageImg = document.querySelector('img#age-rating');

        switch (ageRating) {
            case 'L':
                ageText.innerHTML = "Indicação: Livre para todas as idades";
                ageImg.src = AgeL;
            break;
            case '10':
                ageText.innerHTML = "Indicação: Maiores de 10 anos";
                ageImg.src = Age10;
            break;
            case '12':
                ageText.innerHTML = "Indicação: Maiores de 12 anos";
                ageImg.src = Age12;
            break;
            case '14':
                ageText.innerHTML = "Indicação: Maiores de 14 anos";
                ageImg.src = Age14;
            break;
            case '16':
                ageText.innerHTML = "Indicação: Maiores de 16 anos";
                ageImg.src = Age16;
            break;
            case '18':
                ageText.innerHTML = "Indicação: Maiores de 18 anos";
                ageImg.src = Age18
            break;
            default:
                ageText.innerHTML = "Não foi possível carregar os dados";
                ageImg.src = ErrorImg;
            break;
        }
    }

    render() {
        const allBooks = this.state.allBooks;
        const DatePublication = new Date(allBooks.Datapublicacao);
        
        return (
            <>
                <Header />
                <div className="book-container">
                    <div className="left-content">
                        <img src={allBooks.Imagem_URL} alt={allBooks.Titulo} />
                        <p id="ISBN">ISBN: {allBooks.ISBN}</p>
                        <p id="synopsis">Sinopse: {allBooks.Sinopse}</p>
                    </div>
                    <div className="main-content">
                        <h1>{allBooks.Titulo}</h1>
                        <h2>{allBooks.SubTitulo}</h2>
                        <p id="book-price">R$ {parseFloat(allBooks.Preco).toFixed(2)}</p>
                        <form>
                            <label htmlFor="book-quantity">Quantidade</label>
                            <input type="number" id="book-quantity" defaultValue="1" min="1" required/>
                            <button type="submit">Adicionar ao Carrinho</button>
                        </form>

                        <div className="dropdown-container">
                            <ul>
                                <li>
                                    <button className="dropbtn" onClick={() => this.handleDiv('.plus.item-1','.dropdown-content.item-1', 0)}>
                                        <h3>Descrição do Livro</h3>
                                        <p className="plus item-1">+</p>
                                    </button>
                                    <div className="dropdown-content item-1">
                                        <p>Categoria: Aventura</p>
                                        <div className="ageRating-container">
                                            <p id="info01">Indicação: Não foi possível carregar os dados</p>
                                            <img src={ErrorImg} alt="Indicação de idade" id="age-rating"/> 
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="categories-line item-1" />
                                </li>
                                <li>
                                    <button className="dropbtn" onClick={() => this.handleDiv('.plus.item-2','.dropdown-content.item-2', 1)}>
                                        <h3>Informações do Frete</h3>
                                        <p className="plus item-2">+</p>
                                    </button>
                                    <div className="dropdown-content item-2">
                                        <p> Frete incluso para todo o Brasil. </p>
                                        <p> 
                                            Prazo de entrega: 7 a 10 dias úteis, a partir da confirmação do pagamento.
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div className="categories-line item-2" />
                                </li>
                                <li>
                                    <button className="dropbtn" onClick={() => this.handleDiv('.plus.item-3','.dropdown-content.item-3', 2)}>
                                        <h3>Extras</h3>
                                        <p className="plus item-3">+</p>
                                    </button>
                                    <div className="dropdown-content item-3">
                                        <p> Livro autografado </p>
                                        <p>Brinde: 01 Marcador de livro em formato card.</p>
                                    </div>
                                </li>
                            </ul>

                        </div>

                    </div>
                    <div className="right-content">
                        <p id="book-Author">Autor(a): Erica Falcão</p>
                        <p id="book-Illustrator">Ilustrador(a): {allBooks.Ilustrador}</p>
                        <p id="book-Language">Idioma: {allBooks.Idioma}</p>
                        <p id="book-Format">Formato: {allBooks.Formato} cm</p>
                        <p id="book-pages">N° de Páginas: {allBooks.Numero_Paginas}</p>
                        <p id="book-year">Ano de Publicação: {DatePublication.getFullYear()}</p>
                    </div>
                </div>
            <Footer />
            </>
        );
    }
}