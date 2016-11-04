import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Search from './components/search';
import Artist from './components/artist';
import Release from './components/release';
//import HomePage from './containers/HomePage';
//import CounterPage from './containers/CounterPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Search} />
    <Route path="/a/:id" component={Artist} />
    <Route path="/r/:id" component={Release} />
  </Route>
);
