import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './components/home/Home';
import TablePachuca from "./components/tables/pachuca/TablePachuca";
import LoginContainer from "./components/login/LoginContainer";

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/TablePachuca" component={TablePachuca} />
    <Route exact path="/Login" component={LoginContainer} />
  </Switch>
);
