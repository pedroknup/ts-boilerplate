import * as React from 'react';
import { Route, Switch, Redirect, RouteComponentProps, Router } from 'react-router';
// import { App as TodoApp } from 'app/containers/App';
import { hot } from 'react-hot-loader';
import { LoginComponent } from '../components/pages/login';
import { LoginContainer } from '../components/pages/login/containers/login.container';
import { SidebarComponent } from 'app/components/shared/sidebar';
import { HomeContainer } from '../components/pages/home/containers/container';
import { SidebarContainer } from 'app/components/sidebar';
import { NavbarContainer } from 'app/components/navbar';
import { AboutComponent } from 'app/components/pages/about';
// import { NavbarContainer } from '../components/navbar/containers/container';
import { SettingsContainer } from '../components/pages/settings/containers/container';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import { IApplicationState } from 'app/store';
import * as sessionActions from '../store/sessions/actions';
import * as winActions from '../store/window/actions';
import { withRouter } from 'react-router-dom';
import { TodoContainer } from '../components/pages/todo/containers/container';

interface IPrivateRoutesProps {}
const PrivateRoutes = hot(module)(
  (props: IPrivateRoutesProps & PrivateRoutesContainerProps & RouteComponentProps) => {
    const changeWinWidth = () => {
      props.changeWindowWidth && props.changeWindowWidth(window.innerWidth);
    };

    React.useEffect(() => {
      window.addEventListener('resize', changeWinWidth);
      return () => {
        window.removeEventListener('resize', changeWinWidth);
      };
    }, []);

    React.useEffect(
      () => {
        if (!props.token) {
          props.logout && props.logout();
          props.history.push('/login');
        }
      },
      [props.token]
    );
    return (
      <div
        style={{
          backgroundColor: '#f0f0f0',
          display: 'flex',
          flexDirection: 'row',
          marginLeft: -8,
          overflow: 'scroll',
          marginTop: -8
        }}
      >
        <SidebarContainer currentPath={props.location.pathname} />
        <div style={{ flex: 1 }}>
          <NavbarContainer
            title={props.location.pathname.replace('/', '').replace('-', ' ') || 'Home'}
          />
          <div
            style={{
              padding: 16,
              paddingTop: 0,
              flex: 1,
              maxHeight: 'calc(100vh - 72px)',
              overflow: 'scroll'
            }}
          >
            <Router history={props.history}>
              <Switch>
                <Route exact path="/about" component={AboutComponent} />
                <Route exact path="/settings" component={SettingsContainer} />
                <Route exact path="/to-dos" component={TodoContainer} />
                <Route exact path="/" component={HomeContainer} />
                <Redirect exact from="/login" to="/" />
              </Switch>
            </Router>
          </div>
        </div>
      </div>
    );
  }
);

interface IStateProps {
  token?: string;
}
interface IDispatchProps {
  changeWindowWidth?: (width: number) => void;
  logout?: () => void;
}

const mapStateToProps: MapStateToProps<IStateProps, IPrivateRoutesProps, IApplicationState> = (
  state
) => {
  const { token } = state.session;

  return {
    token
  };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IPrivateRoutesProps> = (dispatch) => {
  return {
    logout: () => dispatch(sessionActions.logoutSession.request()),
    changeWindowWidth: (width) => dispatch(winActions.setWidth(width))
  };
};

export type PrivateRoutesContainerProps = IStateProps & IDispatchProps;

export const PrivateRoutesComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PrivateRoutes));
