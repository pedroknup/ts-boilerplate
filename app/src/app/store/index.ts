import { combineReducers, Dispatch, Reducer, Action, AnyAction } from 'redux';
import { ISessionState } from './sessions/types';
import { sessionReducer } from './sessions/reducer';
import { todoReducer } from './todos/reducer';
import { navigationReducer } from './navigation/reducer';
import { ITodoState } from './todos/types';
import { INavigationState } from './navigation/types';
import { IWindowState } from './window/types';
import { windowReducer } from './window/reducer';

// The top-level state object.
//
// `connected-react-router` already injects the router state typings for us,
// so we can ignore them here.
export interface IApplicationState {
  session: ISessionState;
  navigation: INavigationState;
  window: IWindowState;
  todo: ITodoState;
}

export const rootReducer = combineReducers<IApplicationState>({
  session: sessionReducer,
  navigation: navigationReducer,
  window: windowReducer,
  todo: todoReducer
});
