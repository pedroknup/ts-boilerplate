import * as winActions from './actions';
import { getType } from 'typesafe-actions';
import { IWindowState } from './types';
import { Reducer } from 'redux';

const defaultState: IWindowState = {
  width: 0
};



const reducer: Reducer<IWindowState> = (state = defaultState, action) => {
  switch (action.type) {
    case getType(winActions.setWidthAction()):
      return { ...state, width: action.payload };
    default:
      return state;
  }
};



export { reducer as windowReducer };
