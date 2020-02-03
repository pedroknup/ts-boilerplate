import { createAction, createAsyncAction, action, getType } from 'typesafe-actions';
import { Session, ILoginPayload } from './types';

export const loginFBSession = createAsyncAction(
  'sessions/FETCH_FB_REQUEST',
  'sessions/FETCH_FB_SUCCESS',
  'sessions/FETCH_FB_FAILURE'
)<void, Session, string>();

export const loginIGSession = createAsyncAction(
  'sessions/FETCH_IG_REQUEST',
  'sessions/FETCH_IG_SUCCESS',
  'sessions/FETCH_IG_FAILURE'
)<void, Session, string>();

export const logoutSession = createAsyncAction(
  'sessions/LOGOUT_REQUEST',
  'sessions/LOGOUT_SUCCESS',
  'sessions/LOGOUT_FAILURE'
)<void, Session, string>();

export const loginSession = createAsyncAction(
  'sessions/LOGIN_REQUEST',
  'sessions/LOGIN_SUCCESS',
  'sessions/LOGIN_FAILURE'
)<void, Session, string>();

export const loginAction = (data: ILoginPayload) => action(getType(loginSession.request), data);
export const loginSuccessAction = (data: Session) => action(getType(loginSession.success), data);
export const loginFailureAction = (error: string) => action(getType(loginSession.failure), error);


// export const loginAction = createAction(
//   'sessions/LOGIN_REQUEST',
//   (resolve) => (payload: ILoginPayload) => resolve(payload)
// );
export const loginFBAction = createAction('sessions/FETCH_FB_REQUEST', (resolve) => () =>
  resolve()
);
export const loginIGAction = createAction('sessions/FETCH_IG_REQUEST', (resolve) => () =>
  resolve()
);

export const logout = action('sessions/LOGOUT');
export const logoutAction = createAction('sessions/LOGOUT_REQUEST', (resolve) => () => resolve());
// export const storeAuthData = createAction('sessions/STORE_AUTH', (resolve) => (payload: IStoreAuth) =>
//   resolve(payload),
// );

export const verify = createAction('sessions/VERIFY', (resolve) => () => resolve());
