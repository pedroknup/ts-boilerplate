import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { Router, Switch, Route } from 'react-router';
import configureStore from 'app/store/configure-store';
import { LoginContainer } from './app/components/pages/login/containers/login.container';
import { PrivateRoutesComponent } from 'app/routes/private';

// prepare store
export const history = createBrowserHistory();
const store2 = configureStore(history, {
  navigation: {
    isExpanded: true
  },
  window: {
    width: window.innerWidth
  },
  session: {
    token: '',
    isLoading: false,
    errorMsg: '',
    instagramId: '',
    facebookId: '',
    FBToken: '',
    IGToken: '',
    email: 'admin@admin.com',
    password: ''
  },
  todo: {
    isLoading: false,
    todos: []
  }
});

ReactDOM.render(
  <div style={{ marginRight: -8, fontFamily: "'Lato', sans-serif" }}>
    <Provider store={store2 as any}>
      <Router history={history}>
        <Switch>
          <Route exact path="/login" component={LoginContainer} />
          <Route path="/" component={() => <PrivateRoutesComponent />} />
        </Switch>
      </Router>
    </Provider>
  </div>,
  document.getElementById('root')
);
