import * as React from 'react';
import './style.scss';
import { TodoModel } from 'app/models';
import { TodoActions } from 'app/actions';
interface IProps {
    todo: TodoModel;
    editTodo: typeof TodoActions.editTodo;
    deleteTodo: typeof TodoActions.deleteTodo;
    completeTodo: typeof TodoActions.completeTodo;
  }
export const TodoItem = (props: IProps) => {
  return <div className="todo">teste</div>;
};
