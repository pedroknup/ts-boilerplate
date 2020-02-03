import React from 'react';
import { todo } from '../../../../../../../api/src/entities/todo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faCircle,
  faCircleNotch,
  faCheckSquare,
  faSquare,
  faTrash,
  faTimes,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { faGgCircle } from '@fortawesome/free-brands-svg-icons';

interface ITodoItemComponentProps {
  content: string;
  isDone?: boolean;
  isLoading?: boolean;
  onStatusClick: (isDone: boolean) => void;
  onDelete: () => void;
  onSave?: (text: string, isDone: boolean) => void;
}

export const TodoItemComponent = (props: ITodoItemComponentProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  let inputRef: any;
  const checkboxClick = () => {
    // setIsDone(!isDone);
    console.log('changing it to ', !props.isDone);
    props.onStatusClick && props.onStatusClick(!props.isDone);
  };
  const toggleEditing = () => {
    if (!props.isLoading) setIsEditing(!isEditing);
    // if (isEditing) {
    //  inputRef && inputRef.current && inputRef.current.focus();
    // }
  };
  return (
    <div className="todo-item">
      <div
        className={`todo-item-content ${props.isDone ? 'checked' : ''} ${
          props.isLoading ? 'loading' : ''
        }`}
      >
        {/* <i class="fas fa-circle-notch fa-spin" /> */}
        <FontAwesomeIcon
          className="todo-item-content-checkbox"
          onClick={checkboxClick}
          icon={props.isDone ? faCheckSquare : faSquare}
        />
        {isEditing ? (
          <input
            onBlur={toggleEditing}
            autoFocus
            ref={inputRef}
            onKeyPress={(e) => {
              if (e.which == 13 || e.keyCode == 13) {
                if (e.currentTarget.value.trim()) {
                  props.onSave && props.onSave(e.currentTarget.value, props.isDone ? true : false);
                }
                toggleEditing();
                return false;
              }
              return true;
            }}
            placeholder={props.content}
          />
        ) : (
          <span onClick={toggleEditing}>{props.content}</span>
        )}
        {props.isLoading ? (
          <FontAwesomeIcon className="fas fa-sync fa-spin right" icon={faSpinner} />
        ) : (
          <FontAwesomeIcon
            className="todo-item-content-delete right"
            onClick={props.onDelete}
            icon={faTimes}
          />
        )}
      </div>
    </div>
  );
};
