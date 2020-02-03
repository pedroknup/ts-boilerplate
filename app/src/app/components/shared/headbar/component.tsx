import * as React from 'react';
import './styles.scss';
import { todo } from '../../../../../../api/src/entities/todo';

interface ITodoInfoProps {
  bet: todo;
}

export const TodoInfo = (props: ITodoInfoProps) => {
  if (!props.bet.id) return <div />;
  return (
    <div className="head-bar">
      <div />
    </div>
  );
};
