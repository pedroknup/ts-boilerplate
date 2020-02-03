import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';

// import { IAppState } from '@app/stores';

import * as sessionActions from '../../../../store/sessions/actions';
import { ILoginPayload } from '../../../../store/sessions/types';

import { ILoginComponentProps, LoginComponent } from '../components';
import { RouteComponentProps } from 'react-router';
import { IApplicationState } from 'app/store';
import { Dispatch, Action, AnyAction } from 'redux';

interface IStateProps {
  isLoading: boolean;
  email?: string;
  password?: string;
  errorMsg?: string;
  token?: string;
}
interface IDispatchProps {
  login: (payload: ILoginPayload) => void;
}

const mapStateToProps: MapStateToProps<IStateProps, ILoginComponentProps, IApplicationState> = ({
  session
}) => ({
  isLoading: session.isLoading,
  errorMsg: session.errorMsg,
  email: session.email,
  password: session.password,
  token: session.token
});
// const mapStateToProps = ({ session }: IApplicationState) => ({
//   loading: heroes.loading,
//   errors: heroes.errors,
//   data: heroes.data
// });

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, ILoginComponentProps> = (
  dispatch
) => ({
  login: (payload) => {
    console.log(payload)
    return dispatch(sessionActions.loginAction(payload))}
});

// export interface LoginContainerPropsProps=  IDispatchProps & IStateProps;

export type LoginContainerProps = IStateProps & IDispatchProps & RouteComponentProps;
// const mapDispatchToProps = (dispatch: Dispatch<IDispatchProps>) => ({
//   login: (payload: ILoginPayload) => dispatch(sessionActions.loginAction(payload))
// });

export const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);
