import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import MainContainer from './containers/layout/MainContainer';
import HomeContainer from './containers/HomeContainer';

// import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

import 'jquery';
import 'bootstrap';


const App = () => (
  <Router history={hashHistory}>
    <Route path="/" component={MainContainer} >
      <IndexRoute component={HomeContainer} />
    </Route>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('app-lionsclub'));
