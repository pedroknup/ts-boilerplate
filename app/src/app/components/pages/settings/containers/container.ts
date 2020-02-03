import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';

// import { IAppState } from '@app/stores';

import * as sessionActions from '../../../../store/sessions/actions';
import * as betActions from '../../../../store/todos/actions';
import { ILoginPayload } from '../../../../store/sessions/types';

import { ISettingsComponentProps, SettingsComponent } from '../components';
import { RouteComponentProps } from 'react-router';
import { IApplicationState } from 'app/store';
import { Dispatch, Action, AnyAction } from 'redux';
import { todo } from '../../../../../../../api/src/entities/todo';

interface IStateProps {
  isLoadingBets: boolean;
  token: string;
  isExpanded?: boolean;
  todos?: todo[];
}
interface IDispatchProps {
  login: (payload: ILoginPayload) => void;
  fetchTodos: (token: string) => void;
}

const mapStateToProps: MapStateToProps<IStateProps, ISettingsComponentProps, IApplicationState> = ({
  session,
  navigation,
  todo
}) => ({
  todos: todo.todos,
  isLoadingBets: todo.isLoading,
  token: session.token,
  isExpanded: navigation.isExpanded
});
// const mapStateToProps = ({ session }: IApplicationState) => ({
//   loading: heroes.loading,
//   errors: heroes.errors,
//   data: heroes.data
// });

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, ISettingsComponentProps> = (dispatch) => ({
  login: (payload) => {
    console.log(payload);
    return dispatch(sessionActions.loginAction(payload));
  },
  fetchTodos: (token) => {
    return dispatch(betActions.fetchTodoAction(token));
  }
});

// export interface HomeContainerPropsProps=  IDispatchProps & IStateProps;

export type SettingsContainerProps = IStateProps & IDispatchProps & RouteComponentProps;
// const mapDispatchToProps = (dispatch: Dispatch<IDispatchProps>) => ({
//   login: (payload: ILoginPayload) => dispatch(sessionActions.loginAction(payload))
// });

export const SettingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsComponent);
