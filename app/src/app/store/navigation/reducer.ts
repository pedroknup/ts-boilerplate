import * as navActions from './actions';
import { ActionType, getType } from 'typesafe-actions';
import { INavigationState } from './types';
import { Reducer } from 'redux';

const defaultState: INavigationState = {
  isExpanded: true,
  isOpened: false
};

const reducer: Reducer<INavigationState> = (state = defaultState, action) => {
  switch (action.type) {
    case navActions.toggleExpanded.type:
      return { ...state, isExpanded: !state.isExpanded };
    case navActions.toggleOpened.type:
      return { ...state, isOpened: !state.isOpened };
    default:
      return state;
  }
};

export { reducer as navigationReducer };
