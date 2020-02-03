import * as React from 'react';
import './styles.scss';

interface ITodoInfoComponentProps {
  user?: string;
}
export const TodoInfoComponent = (props:  ITodoInfoComponentProps) => {

  return (
    <div className="head-bar">
      <div>
        {props.user}
      </div>
    </div>
  );
};
