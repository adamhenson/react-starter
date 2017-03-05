import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../../routes/Home';
import About from '../../routes/About';
import NotFound from '../../routes/NotFound';
import Navigation from '../Navigation';

import './global-styles';

function App() {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
