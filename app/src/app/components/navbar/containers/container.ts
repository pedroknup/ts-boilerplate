import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import * as navigationActions from '../../../store/navigation/actions';
import { IApplicationState } from 'app/store';
import { user } from '../../../../../../api/src/entities/user';
import { INavbarComponentProps } from '../components';
import { NavbarComponent } from '../components';
import { withRouter } from 'react-router-dom';
import * as sessionActions from '../../../store/sessions/actions';

interface IStateProps {
  isSidebarExpanded?: boolean;
  loggedUser?: user;
}
interface IDispatchProps {
  toggleSidebar?: () => void;
  logout?: () => void;
}

const mapStateToProps: MapStateToProps<IStateProps, INavbarComponentProps, IApplicationState> = ({
  session,
  navigation,
  todo
}) => ({
  isLoading: todo.isLoading,
  loggedUser: session.user,
  isSidebarExpanded: navigation.isExpanded
});

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, INavbarComponentProps> = (
  dispatch
) => ({
  toggleSidebar: () => {
    return dispatch(
      window.innerWidth > 578 ? navigationActions.toggleExpanded : navigationActions.toggleOpened
    );
  },
  logout: () => dispatch(sessionActions.logoutSession.request())
});

export type INavbarContainerProps = IStateProps & IDispatchProps;

export const NavbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NavbarComponent));
