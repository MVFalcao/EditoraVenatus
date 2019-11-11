import React from 'react';
import  { BrowserRouter, Switch, Route } from 'react-router-dom';

// Páginas do usuário
import Login from './pages/login';
import SignUp from './pages/register';
import Main from './pages/main';
import AllBooks from './pages/allBooks';
import BookPage from './pages/book';
import Events from './pages/allEvents';

// Páginas da conta do usuário
import Account from './pages/User/myAccount';
import Adressess from './pages/User/myAdressess';
import Orders from './pages/User/myOrders';

// Páginas do administrador
  /* Genrenciamento de Livro */
    import addBook from './pages/Administrator/manageBook/addBook';
    import editBookSelection from './pages/Administrator/manageBook/editBook/selection';
    import editBook from './pages/Administrator/manageBook/editBook';
    import deleteBook from './pages/Administrator/manageBook/deleteBook';
  /* Gerenciamento de Livraria */
    import addBookstore from './pages/Administrator/manageBookstore/addBookstore';
    import editBookstoreSelection from './pages/Administrator/manageBookstore/editBookstore/selection';
    import editBookstore from './pages/Administrator/manageBookstore/editBookstore';
    import deleteBookstore from './pages/Administrator/manageBookstore/deleteBookstore';

    import Grafo from './components/Grafo';

export default function Routes() {
  return (
      <BrowserRouter>
        <Switch>
            {/* Rotas do usuário */}
            <Route path="/" exact component={ Main } />
            <Route path="/allBooks" component ={ AllBooks } />
            <Route path="/bookPage/:id" component ={ BookPage } />
            <Route path="/Login" component ={ Login } />
            <Route path="/signup" component ={ SignUp } />
            <Route path="/allEvents" component={ Events } />

            {/* Rotas da conta do usuário */}
            <Route path="/account" component={ Account } />
            <Route path="/adressess" component={ Adressess } />
            <Route path="/orders" component={ Orders } />

            {/* Rotas do administrador */}
              {/* Gerenciamento de Livros */}
                <Route path="/addbook" component={ addBook } />
                <Route path="/editbook/selection" component={ editBookSelection } />
                <Route path="/editbook/:id" component={ editBook } />
                <Route path="/deletebook" component ={ deleteBook } />
              {/* Gerenciamento de Livrarias */}
                <Route path="/addbookstore" component = {addBookstore} />
                <Route path="/editbookstore/selection" component={ editBookstoreSelection } />
                <Route path="/editbookstore/:id" component={ editBookstore } />
                <Route path="/deletebookstore/" component={ deleteBookstore } />
                

                <Route path="/grafo" component={ Grafo } />
        </Switch>
      </BrowserRouter>
  );
}
