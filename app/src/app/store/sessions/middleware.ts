import * as sessions from './actions';
import { Session, ISessionState } from './types';
import { ActionType, getType } from 'typesafe-actions';
import { Middleware, MiddlewareAPI, Dispatch, Action } from 'redux';
// import { userPK } from '../../dummy-data/users';
import { IApplicationState } from '../index';
import { AuthApi } from '../../../api/api';
import { user } from '../../../../../api/src/entities/user';
import browserHistory from 'react-router';
import { history } from '../../../main';

const logger = (api: MiddlewareAPI<IApplicationState>) => {
  const { session } = api.getState();
  return (next: Dispatch<IApplicationState>) => (action: Action) => {
    return next(action);
  };
};

const loginMiddleware: Middleware = (store: any) => (next) => (action: any) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(action.payload);
  }
  if (action.type === getType(sessions.loginSession.request)) {
    const { email, password } = action.payload;
    if (!(email && password)) {
      return next(sessions.loginSession.failure("Email and password can't be empty"));
    }
    const authApi = new AuthApi();
    authApi
      .authLoginPost({ email: email, password: password })
      .then((response) => {
        const responseData = response.body;
        const userResponse: user = responseData.user;
        const session: Session = { token: responseData.token || '', user: userResponse };
        return next(sessions.loginSession.success(session));
      })
      .catch((error: any) => {
        return next(sessions.loginSession.failure(error.response.body.error));
      });
    return next(action);
  } else if (action.type === sessions.logout) {
    const { session } = store.getState();
    return next(sessions.logoutSession.request());
  } else return next(action);
};

export { logger, loginMiddleware };
