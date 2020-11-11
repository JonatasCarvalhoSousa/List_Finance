import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './index.css';
import App from './App';
import Tesouro from './grafico';


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={App} />
      <Route path="/grafico/:ano/:valor" component={Tesouro} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);


