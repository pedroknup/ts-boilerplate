import * as todoActions from './actions';
import { ActionType, getType } from 'typesafe-actions';
import { Middleware, MiddlewareAPI, Dispatch, Action } from 'redux';
// import { userPK } from '../../dummy-data/users';
import { IApplicationState } from '../index';
import { AuthApi, TodoApi } from '../../../api/api';
import { user } from '../../../../../api/src/entities/user';
import browserHistory from 'react-router';
import { history } from '../../../main';
import { todo } from '../../../../../api/src/entities/todo';
import { TodoModel } from 'app/models';

const todoMiddleware: Middleware = (store: any) => (next) => (action: any) => {
  if (action.type === getType(todoActions.fetchTodo.request)) {
    next(todoActions.fetchTodo.request(action.payload));
    if (process.env.NODE_ENV !== 'production') {
      console.log(action.payload);
    }
    const token = action.payload;
    const todoApi = new TodoApi();
    todoApi
      .todoGet({ headers: { auth: token } })
      .then((response) => {
        const todos: TodoModel[] = response.body;
        const orderedArray = [
          ...todos.filter((item) => !item.isDone),
          ...todos.filter((item) => item.isDone)
        ];
        return next(todoActions.fetchTodo.success({ todos: orderedArray }));
      })
      .catch((error: any) => {
        return next(todoActions.fetchTodo.failure(error.response.body.error));
      });
  } else if (action.type === getType(todoActions.postTodo.request)) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(action.payload);
    }
    const tempId = Math.floor(Math.random() * 1000) * -1;
    const { token, newTitle } = action.payload;
    next(todoActions.postTodo.request({ ...action.payload, tempId }));
    const todoApi = new TodoApi();
    todoApi
      .todoPost({ name: newTitle }, { headers: { auth: token } })
      .then((response: any) => {
        const todoResponse: TodoModel = response.body;
        return next(todoActions.postTodo.success({ todo: todoResponse, tempId }));
      })
      .catch((error: any) => {
        return next(
          todoActions.postTodo.failure({
            errorMessage: error.response.body.error,
            tempId
          })
        );
      });
  } else if (action.type === getType(todoActions.putTodo.request)) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(action.payload);
    }
    const tempId = Math.floor(Math.random() * 1000) * -1;
    next(todoActions.putTodo.request({ ...action.payload, tempId }));
    const { token, newTitle, newIsDone, id } = action.payload;
    const todoApi = new TodoApi();
    todoApi
      .todoPut(id, newTitle, newIsDone, { headers: { auth: token } })
      .then((response: any) => {
        const todoResponse: TodoModel = response.body;
        return next(todoActions.putTodo.success({ todo: todoResponse, tempId }));
      })
      .catch((error: any) => {
        return next(todoActions.putTodo.failure(error.response.body.error));
      });
  } else if (action.type === getType(todoActions.deleteTodo.request)) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(action.payload);
    }
    next(todoActions.deleteTodo.request({ ...action.payload }));
    const { token, id } = action.payload;
    const todoApi = new TodoApi();
    todoApi
      .todoDelete(id, { headers: { auth: token } })
      .then((response: any) => {
        const todoResponse: TodoModel = response.body;
        return next(todoActions.deleteTodo.success({ todo: todoResponse, id }));
      })
      .catch((error: any) => {
        return next(todoActions.deleteTodo.failure(error.response.body.error));
      });
  } else return next(action);
};

export { todoMiddleware };
