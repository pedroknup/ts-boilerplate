import * as React from 'react';

import { RouteComponentProps } from 'react-router';
// import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import './styles.scss';
// import  } from '../containers';
import { authThunk } from 'app/middleware/auth.thunk';
import { HomeContainerProps } from '../containers';

import { todo } from '../../../../../../../api/src/entities/todo';

export interface IHomeComponentProps extends HomeContainerProps {}

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    marginTop: 100,
    width: '100%',
    maxWidth: '400px',
    margin: 'auto'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  textField: {
    margin: '8px 0'
  },
  title: {
    margin: '24px auto'
  },
  pos: {
    marginBottom: 12
  }
});

enum loginState {
  signin,
  signup,
  forgot
}
export const HomeComponent = (
  // props: IHomeComponentProps & RouteComponentProps & HomeContainerProps
  props: IHomeComponentProps
) => {
  const [currentLoginState, setCurrentLoginState] = React.useState(loginState.signin);
  const { token, history } = props;
  const [selectedBet, onSelectTodo] = React.useState<todo | undefined>(undefined);
  const classes = useStyles();
  return (
    <div className="home-container">
      {selectedBet && (
        <Card>
          <CardContent>{/* <BetInfo todo={selectedBet} /> */}</CardContent>
        </Card>
      )}
      <div style={{ textAlign: 'left' }}>
        <span
          style={{ overflow: 'hidden', display: 'flex', alignItems: 'baseline', marginBottom: 4 }}
        >
          <span style={{ fontWeight: 'bold', marginRight: 8, marginBottom: 4 }}>
            {'Logged User: '}
          </span>
          <span style={{ fontSize: 14 }}>{props.loggedUser && props.loggedUser.email}</span>
        </span>
        <span style={{ overflow: 'hidden', display: 'flex', alignItems: 'baseline' }}>
          <span style={{ fontWeight: 'bold', marginRight: 8, marginBottom: 4 }}>Token:</span>
          <span
            style={{
              fontSize: 14,
              whiteSpace: 'normal',
              maxWidth: 200,
              overflow: 'hidden',
              display: 'block',
              textOverflow: 'ellipsis'
            }}
          >
            {token}
          </span>
        </span>
        <span style={{ overflow: 'hidden', maxWidth: 200, display: 'block', marginBottom: 4 }}>
          <span style={{ fontWeight: 'bold', marginRight: 8, marginBottom: 4 }}>{'To-dos: '}</span>
          <span style={{ fontSize: 14 }}>{props.todos && props.todos.length}</span>
        </span>
        <span style={{ overflow: 'hidden', maxWidth: 200, display: 'block', marginBottom: 4 }}>
          <span style={{ fontWeight: 'bold', marginRight: 8, marginBottom: 4 }}>{'Users: '}</span>
          <span style={{ fontSize: 14 }}>0</span>
        </span>
        <span style={{ overflow: 'hidden', maxWidth: 200, display: 'block', marginBottom: 4 }}>
          <span style={{ fontWeight: 'bold', marginRight: 8 }}>{'Sidebar: '}</span>
          <span style={{ fontSize: 14 }}>{props.isExpanded ? 'Expanded' : 'Not expanded'}</span>
        </span>
        <span style={{ overflow: 'hidden', maxWidth: 200, display: 'block', marginBottom: 4 }}>
          <span style={{ fontWeight: 'bold', marginRight: 8 }}>{'Window width: '}</span>
          <span style={{ fontSize: 14 }}>{props.winWidth || 0}</span>
        </span>
        <button
          onClick={() => {
            props.fetchTodos(token);
          }}
        >
          Fetch Todos
        </button>
      </div>
    </div>
  );
};
