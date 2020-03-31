import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './components/home/Home';
import TablaPachuca from "./components/tables/pachuca/TablaPachuca";
import Filter from "./components/tables/pachuca/Filter";
import LoginContainer from "./components/login/LoginContainer";

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/CitasPachuca" component={TablaPachuca} />
    <Route exact path="/Filtro" component={Filter} />
    <Route exact path="/Login" component={LoginContainer} />
  </Switch>
);
