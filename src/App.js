import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/Home'
import MovieDetail from './components/MovieDetail';
import Movies from './components/Movies';
import Footer from './components/Footer';
import Favorite from './components/Favorite';

function App() {


  return (
  
  <Router>
  <Fragment>


    <NavBar></NavBar>
    <Switch>
    <Route exact path="/" component={Home}></Route>
    <Route exact path="/movie/:id" component={MovieDetail}></Route>
    <Route exact path="/movies" component={Movies}></Route>
    <Route exact path="/favorite" component={Favorite}></Route>
    <Home></Home>
    </Switch>
    {/* <Footer></Footer> */}
   


  </Fragment>
  </Router>


  )
}
  

export default App;
