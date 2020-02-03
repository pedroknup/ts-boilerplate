import * as React from 'react';
import { Route, Switch, Router, RouteProps, RouterProps } from 'react-router';
// import { App as TodoApp } from 'app/containers/App';
import { hot } from 'react-hot-loader';
import { LoginComponent } from '../components/pages/login';
import { LoginContainer } from '../components/pages/login/containers/login.container';

export const PublicRoutes = hot(module)((history : any) => (
  <Router history={history}>
    <Switch>
      <Route path="/login" component={LoginContainer} />
    </Switch>
  </Router>
));
