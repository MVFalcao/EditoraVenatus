import React from 'react';
import  { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/login';
import SignUp from './pages/register';
import Main from './pages/main';
import AllBooks from './pages/allBooks';
import BookPage from './pages/book';
import Events from './pages/allEvents';
import myAccount from './pages/myAccount';

export default function Routes() {
  return (
      <BrowserRouter>
        <Switch>
            <Route path="/" exact component={ Main } />
            <Route path="/allBooks" component ={ AllBooks } />
            <Route path="/bookPage/:id" component ={ BookPage } />
            <Route path="/Login" component ={ Login } />
            <Route path="/signup" component ={ SignUp } />
            <Route path="/allEvents" component={ Events } />
            <Route path="/myaccount" component={myAccount} />
        </Switch>
      </BrowserRouter>
  );
}
