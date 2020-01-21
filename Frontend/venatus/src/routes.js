import React from 'react';
import  { BrowserRouter, Switch, Route } from 'react-router-dom';

// Páginas do usuário
	import Login from './pages/login';
	import SignUp from './pages/register';
	import Main from './pages/main';
	import AllBooks from './pages/allBooks';
	import BookPage from './pages/Book';
	import Events from './pages/allEvents';
	import AboutUs from './pages/AboutUs';
	import ContactUs from './pages/Contact';
	import API from './pages/API';

// Páginas da conta do usuário
	import Account from './pages/User/myAccount';
	import Adressess from './pages/User/myAddressess';
	import Orders from './pages/User/myOrders';

// Páginas dos Grafos
	import GrafoLA from './components/Grafo/LivrosAutores';
	import GrafoLC from './components/Grafo/LivrosCupons';

// Páginas do administrador
	import administrator from './pages/Administrator';
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
  	/* Gerenciamento de Autores */
		import addAuthor from './pages/Administrator/manageAuthor/addAuthor';
		import editAuthor from './pages/Administrator/manageAuthor/editAuthor';
		import editAuthorSelection from './pages/Administrator/manageAuthor/editAuthor/selection';
		import deleteAuthor from './pages/Administrator/manageAuthor/deleteAuthor';
	/* Gerenciamento de Cupons */
		import addCoupon from './pages/Administrator/manageCoupons/addCoupon';
		import editCouponSelection from './pages/Administrator/manageCoupons/editCoupon/selection';
		import editCoupon from './pages/Administrator/manageCoupons/editCoupon';
		import deleteCoupon from './pages/Administrator/manageCoupons/deleteCoupon';
	/* Gerencimaneto de Vendas */
		import addSell from './pages/Administrator/manageSells/addSell';

export default function Routes() {
	return (
      	<BrowserRouter>
        	<Switch>
            
			{/* Rotas do usuário */}
				<Route path="/" exact component={ Main } />
				<Route path="/Login" component ={ Login } />
				<Route path="/signup" component ={ SignUp } />
				<Route path="/allBooks" component ={ AllBooks } />
				<Route path="/bookPage/:id" component ={ BookPage } />
				<Route path="/aboutus" component={ AboutUs } />
				<Route path="/events" component={ Events } />
				<Route path="/contactus" component={ ContactUs } />
				<Route path="/api" component={ API } />

            {/* Rotas da conta do usuário */}
				<Route path="/account" component={ Account } />
				<Route path="/addressess" component={ Adressess } />
				<Route path="/orders" component={ Orders } />

			{/* Grafos */}
				<Route path="/grafola" component={ GrafoLA } />	
				<Route path="/grafolc" component={ GrafoLC } />	

            {/* Rotas do administrador */}
				<Route path="/administrator" component={ administrator } />
              	{/* Gerenciamento de Livros */}
					<Route path="/addbook" component={ addBook } />
					<Route path="/editbook/selection" component={ editBookSelection } />
					<Route path="/editbook/:id" component={ editBook } />
					<Route path="/deletebook" component ={ deleteBook } />
              	{/* Gerenciamento de Livrarias */}
					<Route path="/addbookstore" component={addBookstore} />
					<Route path="/editbookstore/selection" component={ editBookstoreSelection } />
					<Route path="/editbookstore/:id" component={ editBookstore } />
					<Route path="/deletebookstore/" component={ deleteBookstore } />
              	{/* Gerenciamento de Autores */}
					<Route path="/addauthor" component={ addAuthor } />
					<Route path="/editauthor/selection" component={ editAuthorSelection } />
					<Route path="/editauthor/:id" component={ editAuthor } />
					<Route path="/deleteauthor" component={ deleteAuthor } />
                {/* Gerenciamento de Cupom */}
					<Route path="/addcoupon" component={ addCoupon } />
					<Route path="/editcoupon/selection" component={ editCouponSelection } />
					<Route path="/editcoupon/:id" component={ editCoupon } />
					<Route path="/deletecoupon" component={ deleteCoupon } />
				{/* Gerenciamento de Vendas */}
					<Route path="/addsell" component={ addSell } />
        	</Switch>
      </BrowserRouter>
 	);
}
