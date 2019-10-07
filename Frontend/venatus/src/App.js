import React from 'react';
import Header from './components/Header';
import Login from './pages/login';
//import SignIn from './pages/signIn';
import Main from './pages/main';
import AllBooks from './pages/allBooks';
import BookPage from './pages/book';
import Footer from './components/Footer';

import './styles.css';

const App = () => (
  <div className="App">
    {/* <SignIn /> */}
    {/* <Login /> */}
    <Header />
    {/* <Main /> */}
    <BookPage />
    {/* <AllBooks /> */}
    <Footer />
  </div>
)

export default App;
