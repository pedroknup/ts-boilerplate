import { createAction, createAsyncAction, action, getType } from 'typesafe-actions';

// export const toggleNavba2r = createAction('navigation/TOGGLE', (resolve) => () => resolve());
export const toggleExpanded = action('navigation/TOGGLE_EXPANDED');
export const toggleOpened = action('navigation/TOGGLE_OPENED');
// export const toggleNavbar = createAction('navigation/TOGGLE', (resolve) => () => resolve());
