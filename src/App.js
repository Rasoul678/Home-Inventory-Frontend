import React from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Header from './components/Header';
import Home from './components/Home';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import NotFound from './components/NotFound';
import Profile from './components/Profile';
import Items from './components/items/Items';
import ShowItem from './components/items/ShowItem';
import AddItem from './components/items/AddItem';
import Settings from './components/Settings';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path = "/" component = {Home} />
          <Route exact path = "/login" component = {LoginPage} />
          <Route exact path = "/register" component = {RegisterPage} />
          <Route exact path = "/settings" component = {Settings} />
          <Route exact path = "/profile/:name" component = {Profile} />
          <Route exact path = "/items" component = {Items} />
          <Route exact path = "/items/create" component = {AddItem} />
          <Route exact path = "/items/:id/details" component = {ShowItem} />
          <Route exact path = "*" component = {NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
