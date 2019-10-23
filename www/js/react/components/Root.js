import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux'
import { withStyles } from 'material-ui/styles';
import { HashRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import App2 from './App2';
import Menu from './Menu';
import CardList from './CardList';

const Root = () => {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Menu} />
          <Route exact path="/list" component={CardList} />
          <Route exact path="/app" component={App} />
          <Route exact path="/app2" component={App2} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default Root;
