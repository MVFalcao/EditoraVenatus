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
import myAccount from './pages/myAccount';

// Páginas do administrador
import addBook from './pages/Administrator/manageBook/addBook';
import editBookSelection from './pages/Administrator/manageBook/editBook/selection';
import editBook from './pages/Administrator/manageBook/editBook';
import deleteBook from './pages/Administrator/manageBook/deleteBook';

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
            <Route path="/myaccount" component={ myAccount } />

            {/* Rotas do administrador */}
              {/* Gerenciamento de Livros */}
                <Route path="/addbook" component= { addBook } />
                <Route path="/editbook/selection" component= { editBookSelection } />
                <Route path="/editbook/:id" component={ editBook } />
                <Route path="/deletebook/selection" component={deleteBook} />

        </Switch>
      </BrowserRouter>
  );
}
