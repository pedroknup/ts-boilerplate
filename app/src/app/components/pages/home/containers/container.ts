import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';

// import { IAppState } from '@app/stores';

import * as sessionActions from '../../../../store/sessions/actions';
import * as betActions from '../../../../store/todos/actions';
import { ILoginPayload } from '../../../../store/sessions/types';

import { IHomeComponentProps, HomeComponent } from '../components';
import { RouteComponentProps } from 'react-router';
import { IApplicationState } from 'app/store';
import { Dispatch, Action, AnyAction } from 'redux';
import { todo } from '../../../../../../../api/src/entities/todo';
import { user } from '../../../../../../../api/src/entities/user';

interface IStateProps {
  isLoadingBets: boolean;
  token: string;
  isExpanded?: boolean;
  loggedUser?: user;
  winWidth?: number;
  todos?: todo[];
}
interface IDispatchProps {
  login: (payload: ILoginPayload) => void;
  fetchTodos: (token: string) => void;
}

const mapStateToProps: MapStateToProps<IStateProps, IHomeComponentProps, IApplicationState> = ({
  session,
  navigation,
  window,
  todo
}) => ({
  todos: todo.todos,
  isLoadingBets: todo.isLoading,
  token: session.token,
  loggedUser: session.user,
  winWidth: window.width,
  isExpanded: navigation.isExpanded
});
// const mapStateToProps = ({ session }: IApplicationState) => ({
//   loading: heroes.loading,
//   errors: heroes.errors,
//   data: heroes.data
// });

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IHomeComponentProps> = (dispatch) => ({
  login: (payload) => {
    console.log(payload);
    return dispatch(sessionActions.loginAction(payload));
  },
  fetchTodos: (token) => {
    return dispatch(betActions.fetchTodoAction(token));
  }
});

// export interface HomeContainerPropsProps=  IDispatchProps & IStateProps;

export type HomeContainerProps = IStateProps & IDispatchProps & RouteComponentProps;
// const mapDispatchToProps = (dispatch: Dispatch<IDispatchProps>) => ({
//   login: (payload: ILoginPayload) => dispatch(sessionActions.loginAction(payload))
// });

export const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent);
