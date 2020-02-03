import * as actions from './actions';
import { getType } from 'typesafe-actions';
import { ITodoState } from './types';
import { Reducer } from 'redux';

const defaultState: ITodoState = {
  isLoading: false,
  todos: []
};

const reducer: Reducer<ITodoState> = (state = defaultState, action) => {
  let toSave;
  const currentTodos = state.todos || [];
  switch (action.type) {
    case getType(actions.putTodo.request):
      toSave = {
        ...state,
        todos: [
          ...currentTodos.map((item) => {
            if (item.id == action.payload.id)
              return { ...item, isLoading: true, name: action.payload.newTitle };
            return { ...item };
          })
        ],
        isLoading: false
      };
      return { ...toSave };
    case getType(actions.postTodo.request):
      const tempId: number = action.payload.tempId;
      const name: string = action.payload.newTitle;
      return {
        ...state,
        todos: [
          {
            id: tempId,
            name,
            isLoading: true,
            isDone: false,
            createdAt: new Date(),
            user: null,
            description: null
          },
          ...currentTodos
        ],
        isLoading: true
      };

    case getType(actions.fetchTodo.failure):
      toSave = { ...state, isLoading: false };
      return { ...toSave };

    case getType(actions.fetchTodo.request):
      toSave = { ...state, isLoading: true };
      return { ...toSave };
    case getType(actions.fetchTodo.success):
      toSave = { ...state, todos: action.payload.todos, updatedAt: new Date(), isLoading: false };
      return { ...toSave };
    case getType(actions.postTodo.success):
      toSave = {
        ...state,
        todos: [
          ...currentTodos.map((item) => {
            if (item.id === action.payload.tempId) {
              return { ...item, isLoading: false, ...action.payload.todo };
            }
            return { ...item };
          })
        ],
        isLoading: false
      };
      return { ...toSave };
    case getType(actions.putTodo.success):
      toSave = {
        ...state,
        updatedAt: new Date(),
        todos: [
          ...currentTodos
            .map((item) => {
              if (item.id === action.payload.todo.id)
                return {
                  ...item,
                  isDone: action.payload.todo.isDone,
                  name: action.payload.todo.name,
                  isLoading: false
                };
              return { ...item };
            })
            .sort((a, b) => {
              if (a.isDone > b.isDone) {
                return 1;
              }
              if (b.isDone > a.isDone) {
                return -1;
              }
              return 0;
            })
        ],
        isLoading: false
      };
      return { ...toSave };
    case getType(actions.deleteTodo.success):
      toSave = {
        ...state,
        todos: [
          ...currentTodos
            .filter((item) => {
              return item.id !== action.payload.id;
            })
            .sort((a, b) => {
              if (a.isDone > b.isDone) {
                return 1;
              }
              if (b.isDone > a.isDone) {
                return -1;
              }
              return 0;
            })
        ],
        isLoading: false
      };
      return { ...toSave, updatedAt: new Date() };
    case getType(actions.deleteTodo.request):
      return {
        ...state,
        todos: [
          ...currentTodos.map((item) => {
            if (item.id == action.payload.id) {
              return { ...item, isLoading: true };
            }
            return { ...item };
          })
        ],
        isLoading: true
      };
    default:
      return state;
  }
};

export { reducer as todoReducer };
