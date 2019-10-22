import React from 'react';
import  { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/login';
import normalSignUp from './pages/signUp/normal';
import blogSignUp from './pages/signUp/blog';
import professorSignUp from './pages/signUp/professor';
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
            <Route path="/normal_SignUp" component ={ normalSignUp } />
            <Route path="/blog_SignUp" component ={ blogSignUp } />
            <Route path="/professor_SignUp" component ={ professorSignUp } />
            <Route path="/events" component={ Events } />
        </Switch>
      </BrowserRouter>
  );
}
