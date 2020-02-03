import { createAsyncAction, action, getType } from 'typesafe-actions';
import { TodoModel } from 'app/models';

export const fetchTodo = createAsyncAction(
  'todo/FETCH_REQUEST',
  'todo/FETCH_SUCCESS',
  'todo/FETCH_FAILURE'
)<void, { todos: TodoModel[] }, string>();

export const postTodo = createAsyncAction(
  'todo/POST_REQUEST',
  'todo/POST_SUCCESS',
  'todo/POST_FAILURE'
)<
  { token: string; newTitle: string },
  { todo: TodoModel; tempId: number },
  { errorMessage: string; tempId: number }
>();

export const putTodo = createAsyncAction(
  'todo/PUT_REQUEST',
  'todo/PUT_SUCCESS',
  'todo/PUT_FAILURE'
)<
  { id: number; token: string; newTitle: string; newIsDone: number; tempId?: number },
  {todo: TodoModel, tempId: number},
  { errorMessage: string; tempId?: number }
>();

export const deleteTodo = createAsyncAction(
  'todo/DELETE_REQUEST',
  'todo/DELETE_SUCCESS',
  'todo/DELETE_FAILURE'
)<{ token: string; id: number }, {todo:TodoModel, id: number}, string>();

export const fetchTodoAction = (token: string) => action(getType(fetchTodo.request), token);
export const putTodoAction = (id: number, token: string, newTitle: string, newIsDone: number) =>
  action(getType(putTodo.request), { id, token, newTitle, newIsDone });
