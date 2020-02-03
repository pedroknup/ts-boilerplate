import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';

// import { IAppState } from '@app/stores';

import * as sessionActions from '../../../../store/sessions/actions';
import * as todoActions from '../../../../store/todos/actions';
import { ILoginPayload } from '../../../../store/sessions/types';

import { ITodoComponentProps, TodoComponent } from '../components';
import { RouteComponentProps } from 'react-router';
import { IApplicationState } from 'app/store';
import { Dispatch, Action, AnyAction } from 'redux';
import { todo } from '../../../../../../../api/src/entities/todo';
import { TodoModel } from 'app/models';

interface IStateProps {
  isLoadingTodos?: boolean;
  isLoadingAdd?: boolean;
  updatedAt?: Date;
  todos?: TodoModel[];
  token?: string;
}
interface IDispatchProps {
  fetchTodos?: (token: string) => void;
  postTodo?: (token: string, newTitle: string) => void;
  putTodo?: (id: number, token: string, newTitle: string, newIsDone: number) => void;
  deleteTodo?: (token: string, id: number) => void;
}

const mapStateToProps: MapStateToProps<IStateProps, ITodoComponentProps, IApplicationState> = ({
  session,
  navigation,
  todo
}) => ({
  todos: todo.todos,
  isLoadingTodos: todo.isLoading,
  token: session.token,
  isLoadingAdd: todo.isLoading,
  updatedAt: todo.updatedAt
});
// const mapStateToProps = ({ session }: IApplicationState) => ({
//   loading: heroes.loading,
//   errors: heroes.errors,
//   data: heroes.data
// });

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, ITodoComponentProps> = (dispatch) => ({
  fetchTodos: (token) => {
    return dispatch(todoActions.fetchTodoAction(token));
  },
  postTodo: (token, newTitle) => {
    return dispatch(todoActions.postTodo.request({ token, newTitle }));
  },
  putTodo: (id, token, newTitle, newIsDone) => {
    return dispatch(todoActions.putTodo.request({ id, token, newTitle, newIsDone }));
  },
  deleteTodo: (token, id) => {
    return dispatch(todoActions.deleteTodo.request({ token, id }));
  }
});

// export interface HomeContainerPropsProps=  IDispatchProps & IStateProps;

export type TodoContainerProps = IStateProps & IDispatchProps;
// const mapDispatchToProps = (dispatch: Dispatch<IDispatchProps>) => ({
//   login: (payload: ILoginPayload) => dispatch(sessionActions.loginAction(payload))
// });

export const TodoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoComponent);
