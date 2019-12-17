import React, {Component} from 'react';
import { Link } from 'react-router-dom';
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
import Cupom from '../../assets/allBooks/cupoun.svg';

export default class Book extends Component {

    state = {
        Cupom: "",
        CupomData: [],
        dateIsValid: false,

        RecommendedBooks: [],

        divClosedList: [true, true, true],
        Book: [],
        author: [],
    }

    handleAge() {
        const ageRating = this.state.Book.Classificacao_Indicativa;
        const ageText = document.querySelector('p#info01');
        const ageImg = document.querySelector('img#age-rating');        

        switch (ageRating) {
            case '0':
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
    
    //#region APIcalls
        loadBooks = async () => {
            await api.get(`api/Livros/${this.props.match.params.id}`).then(res => {
                // console.log(res.data);

                this.setState({Book: res.data});
                this.handleAge();
                this.loadAuthors();
                this.loadRecommendations(this.props.match.params.id);
            }).catch(error => {
                console.log('loadBooks -> ' + error);
            });
        }

        async loadAuthors() {
            await api.get(`api/Autors/${this.state.Book.Id_autor}`).then(res => {
                // console.log(res.data);

                this.setState({author: res.data});
            }).catch(error => {
                console.log('Authors -> : ' + error);   
            });
        }

        loadRecommendations = async (ID_Livro = 0) => {
            await api.post(`api/garfoTeste?id=${ID_Livro}`).then(res => {
                // console.log(res.data);

                for (const recommendation of res.data) {
                    api.get(`api/Livros/${recommendation}`).then(res => {
                        console.log(res.data);
                        let book = res.data;
                        this.setState({RecommendedBooks: this.state.RecommendedBooks.concat(book)});
                    }).catch(error => {
                        console.log('loadRecommendation -> ' + error);
                    });
                }
            }).catch(error => {
                console.log('loadRecommendations -> ' + error);
            });
        }
    //#endregion

    componentDidMount() {
        this.loadBooks();
    }

    //#region HandleDropdown
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
    //#endregion

    handleDateSplit = (Date="") => {
        let SplitDate = Date.split('T');
        SplitDate = SplitDate[0].split('-');
        SplitDate = `${SplitDate[2]}/${SplitDate[1]}/${SplitDate[0]}`;

        return SplitDate;
    }

    validateCouponDate = (DateIni, DateEnd) => {
        let SystemDate =  new Date();

        DateIni = this.handleDateSplit(DateIni);
        DateEnd = this.handleDateSplit(DateEnd);
        SystemDate = `${SystemDate.getDate()}/${SystemDate.getMonth()+1}/${SystemDate.getFullYear()}`;
        console.log(`System: ${SystemDate}`);
        

        let d1 = DateIni.split("/");
        let d2 = DateEnd.split("/");
        let c = SystemDate.split("/");

        let from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);
        let to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
        let check = new Date(c[2], parseInt(c[1])-1, c[0]);


        if (check > from && check < to) this.setState({dateIsValid: true});
    }

    clearCupounUI = () => {
        document.querySelector('#cupoun-invalidError').style.display = "none";
        document.querySelector("#cupoun-success").style.display = "none";
        document.querySelector('#book-price').style.textDecoration = 'none';
        document.querySelector('#new-price').style.display = "none";
        document.querySelector('#pagseguroBtn').href = this.state.Book.Botao_URL;
    }

    handleCupoun = event => {
        this.setState({Cupom: event.target.value});
        this.clearCupounUI();
    }
    
    validateCupoun = async () => {

        let invalidCoupon = document.querySelector('#cupoun-invalidError');

        await api.post(`api/ValidateCupom?senha=${this.state.Cupom}`).then(res => {
            console.log(res.data);
            const jwt = localStorage.getItem("jwt");

            if (res.data.length !== 0) {
                const ID_Cupom = res.data;
                
                api.get(`api/Cupoms/${ID_Cupom}`, {
                    headers: {'jwt': jwt},
                }).then(res => {
                    // console.log(res.data);
                    this.setState({CupomData: res.data});
                    this.validateCouponDate(this.state.CupomData.Data_Ini, this.state.CupomData.Data_Fim);

                    if (this.state.Book.ID_Livro === this.state.CupomData.Id_livro) {
                            
                        if (this.state.dateIsValid) {

                            document.querySelector("#cupoun-success").style.display = "block";
                            document.querySelector('#book-price').style.textDecoration = 'line-through';
                            
                            let newPrice = document.querySelector('#new-price');
                            newPrice.style.display = 'block';
                            newPrice.innerHTML= `R$ ${parseFloat(this.state.CupomData.Desconto).toFixed(2)}`
                            
                            document.querySelector('#pagseguroBtn').href = this.state.CupomData.Botao_URL;
                        
                        } else {
                            invalidCoupon.style.display = "block";
                            invalidCoupon.innerHTML= "Cupom Expirado";
                        }
                    } else {
                        invalidCoupon.style.display = "block";
                        
                    }
                });
            } else {
                invalidCoupon.style.display = "block";
                invalidCoupon.innerHTML= "Cupom Inválido";
            }
        });
    }

    render() {
        
        const Book = this.state.Book;
        const DatePublication = new Date(Book.Datapublicacao);
        const author = this.state.author;
        
        return (
            <>
                <Header />

                <div className="book-container">

                    <div className="left-content">

                        <img src={Book.Imagem_URL} alt={Book.Titulo} />
                        <p id="ISBN">ISBN: {Book.ISBN}</p>
                        <p id="synopsis">Sinopse: {Book.Sinopse}</p>

                    </div>

                    <div className="main-content">

                        <h1>{Book.Titulo}</h1>
                        <h2>{Book.SubTitulo}</h2>
                        <p id="book-price">R$ {parseFloat(Book.Preco).toFixed(2)}</p>
                        <p id="new-price"></p>

                        <a  id="pagseguroBtn"
                            href={Book.Botao_URL} 
                            target="_blank" rel="noopener noreferrer">
                            <img src="//assets.pagseguro.com.br/ps-integration-assets/botoes/pagamentos/205x30-pagar-azul.gif"
                            alt="Pague com PagSeguro - é rápido, grátis e seguro!"/>
                        </a>

                        <div className="cupoun-container">
                            <ul>
                                <li>
                                    <img src={Cupom} alt="Cupom"/>
                                    <label htmlFor="cupom">Cupom de Desconto</label>
                                </li>

                                <li id="cupoun-input">
                                    <input 
                                        type="text" 
                                        id="cupom"
                                        style={{textTransform: 'uppercase'}}
                                        value={this.state.Cupom}
                                        onChange={this.handleCupoun}
                                    />
                                    <button onClick={() => this.validateCupoun()}>APLICAR</button>
                                </li>
                                <li id="cupoun-response">
                                    <p id="cupoun-success" style={{color: 'green'}}>Cupom validado</p>
                                    <p id="cupoun-dateError" style={{color: '#da3232'}}>Cupom Expirou</p>
                                    <p id="cupoun-invalidError" style={{color: '#da3232'}}>Cupom Inválido</p>
                                </li>
                            </ul>

                        </div>

                        <div className="dropdown-container">

                            <ul>

                                <li>

                                    <button className="dropbtn" onClick={() => this.handleDiv('.plus.item-1','.dropdown-content.item-1', 0)}>
                                        <h3>Descrição do Livro</h3>
                                        <p className="plus item-1">+</p>
                                    </button>

                                    <div className="dropdown-content item-1">

                                        <p>Categoria: {Book.Categoria} </p>

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
                                        <p> Prazo de entrega: 7 a 10 dias úteis, a partir da confirmação do pagamento. </p>

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

                        <p id="book-Author">Autor(a): {author.Nome}</p>
                        <p id="book-Illustrator">Ilustrador(a): {Book.Ilustrador}</p>
                        <p id="book-Language">Idioma: {Book.Idioma}</p>
                        <p id="book-Format">Formato: {Book.Formato} cm</p>
                        <p id="book-pages">N° de Páginas: {Book.Numero_Paginas}</p>
                        <p id="book-year">Ano de Publicação: {DatePublication.getFullYear()}</p>

                    </div>


                </div>
                
                <div className="recommendations-container">

                    {this.state.RecommendedBooks.length === 0 ? 
                        <></>
                    :
                        <>
                            <h1>Sugestões de livros similares</h1>

                            <ul>
                                {this.state.RecommendedBooks.map(book => (
                                    <li key={book.ID_Livro}>
                                        <Link to={`/bookPage/${book.ID_Livro}`}>
                                            <img src={book.Imagem_URL} alt="" />
                                        </Link>
                                        <h2>{book.Titulo} {book.SubTitulo}</h2>
                                        <Link to={`/bookPage/${book.ID_Livro}`} onClick={() => window.location.reload()} id="BookBtn">Saiba mais</Link>
                                    </li>
                                ))}
                            </ul>
                        </>
                    }
                </div>

            <Footer />

            </>
        );
    }
}