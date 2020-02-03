import * as sessions from './actions';
import { ActionType, getType } from 'typesafe-actions';
import { ISessionState } from './types';
import { Reducer } from 'redux';

const defaultState: ISessionState = {
  token: '',
  isLoading: false,
  user: undefined,
  errorMsg: '',
  FBToken: '',
  IGToken: '',
  email: 'admin@admin.com',
  password: ''
};

const reducer: Reducer<ISessionState> = (state = defaultState, action) => {
  let toSave;
  switch (action.type) {
    case getType(sessions.logoutSession.request):
      return { ...state, token: '' };
    case getType(sessions.loginFBSession.failure):
      toSave = { ...state, isLoading: false, user: undefined, token: '', errorMsg: action.payload };
      return { ...toSave };
    case getType(sessions.loginIGSession.failure):
      toSave = { ...state, isLoading: false, user: undefined, token: '', errorMsg: action.payload };
      return { ...toSave };
    case getType(sessions.loginSession.failure):
      toSave = { ...state, isLoading: false, user: undefined, token: '', errorMsg: action.payload };
      return { ...toSave };

    case getType(sessions.loginFBSession.request):
      return { ...state, isLoading: true, errorMsg: '' };

    case getType(sessions.loginSession.request):
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        isLoading: true,
        errorMsg: ''
      };

    case getType(sessions.loginSession.success):
      toSave = {
        ...state,
        email: '',
        password: '',
        token: action.payload.token,
        user: action.payload.user,
        errorMsg: '',
        isLoading: false
      };
      return { ...toSave };

    default:
      return state;
  }
};

export { reducer as sessionReducer };
