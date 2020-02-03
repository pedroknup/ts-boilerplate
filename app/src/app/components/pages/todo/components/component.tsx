import * as React from 'react';
import './styles.scss';
import { TodoContainerProps } from '../containers';
import { TextField, Button, Card, CardContent } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { TodoItemComponent } from './todo-item';
import moment = require('moment');

const TOLERANCE_MS = 5000;

export interface ITodoComponentProps {}

export const TodoComponent = (props: ITodoComponentProps & TodoContainerProps) => {
  const [contentToAdd, setContentToAdd] = React.useState('');
  const [descriptionToAdd, setDescriptionToAdd] = React.useState('');
  const [elevation, setElevation] = React.useState(1);
  // const [todos, setTodos] = React.useState<string[]>([]);
  const todos = props.todos;
  const elevateCard = () => {
    setElevation(4);
  };

  React.useEffect(() => {
    const now = new Date();

    if (
      !props.updatedAt ||
      (props.updatedAt && now.getTime() - props.updatedAt.getTime() > TOLERANCE_MS)
    ) {
      props.fetchTodos && props.fetchTodos(props.token || '');
    }
  }, []);

  return (
    <div className="todo-container">
      <div className="todo-form">
        <input
          onKeyPress={(e) => {
            if (e.which == 13 || e.keyCode == 13) {
              if (contentToAdd) {
                props.postTodo && props.postTodo(props.token || '', contentToAdd);
                setContentToAdd('');
              }
              return false;
            }
            return true;
          }}
          onChange={(e) => {
            setContentToAdd(e.currentTarget.value);
          }}
          value={contentToAdd}
          onFocus={elevateCard}
          placeholder="What needs to be done?"
        />
      </div>
      {todos && todos.length ? (
        <div>
          <Card style={{ flex: 1 }}>
            <CardContent style={{ padding: 0 }}>
              {todos.map(
                (item, key) =>
                  item && (
                    <TodoItemComponent
                      isLoading={item.isLoading}
                      onDelete={() => {
                        console.log('item id', item.id);
                        props.deleteTodo && props.deleteTodo(props.token || '', item.id);
                      }}
                      onSave={(text, isDone) => {
                        props.putTodo &&
                          props.putTodo(item.id, props.token || '', text, isDone ? 1 : 0);
                      }}
                      onStatusClick={(isDone) => {
                        props.putTodo &&
                          props.putTodo(item.id, props.token || '', item.name, isDone ? 1 : 0);
                      }}
                      key={key}
                      isDone={item.isDone ? true : false}
                      content={item.name}
                    />
                  )
              )}
              <span style={{ fontSize: 14, lineHeight: '50px', padding: '8px' }}>{`${
                todos.length
              } item(s)`}</span>
            </CardContent>
          </Card>
        </div>
      ) : (
        <span style={{ fontSize: 14, lineHeight: '50px', color: '#aaa' }}>Nothing to show. </span>
      )}
      <span style={{ fontSize: 10, lineHeight: '50px', color: '#aaa' }}>
        {`Updated at ${props.updatedAt ? moment(props.updatedAt).format('HH:MM:ss') : 'nope'}`}
      </span>
    </div>
  );
};
