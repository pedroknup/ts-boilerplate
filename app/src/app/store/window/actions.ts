import { createAction, action, getType } from 'typesafe-actions';

export const setWidthAction = createAction('window/SET_WIDTH', (resolve) => (width: number) =>
  resolve(width)
);
export const setWidth = (width: number) => action(getType(setWidthAction()), width);
