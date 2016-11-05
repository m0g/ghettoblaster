import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Index from './components/index';
import Artist from './components/artist';
import Release from './components/release';
import SearchResults from './components/search-results';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Index} />
    <Route path="/a/:id" component={Artist} />
    <Route path="/r/:id" component={Release} />
    <Route path="/sr" component={SearchResults} />
  </Route>
);
