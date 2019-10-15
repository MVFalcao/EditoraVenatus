import React from 'react';
import  { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/login';
import SignIn from './pages/signIn';
import Main from './pages/main';
import AllBooks from './pages/allBooks';
import BookPage from './pages/book';
import Events from './pages/events';

export default function Routes() {
  return (
      <BrowserRouter>
        <Switch>
            <Route path="/" exact component={ Main } />
            <Route path="/allBooks" component ={ AllBooks } />
            <Route path="/bookPage" component ={ BookPage } />
            <Route path="/Login" component ={ Login } />
            <Route path="/SignIn" component ={ SignIn } />
            <Route path="/events" component={ Events } />
        </Switch>
      </BrowserRouter>
  );
}
