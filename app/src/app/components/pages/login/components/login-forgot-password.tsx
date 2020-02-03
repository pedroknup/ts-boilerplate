import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { faArrowLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { validateEmail } from 'app/utils';
import GradientButtonComponent from 'app/components/shared/gradient-button';

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

interface ILoginFormProps {
  isLoading?: boolean;
  onLogin?: () => void;
  onBackClick: () => void;
}
export const LoginForgotPassword = (props: ILoginFormProps) => {
  const [email, setEmail] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isSuccess, setIsSuccess] = React.useState(false);
  const validateEmailField = () => {
    if (email) {
      if (validateEmail(email)) {
        setErrorMessage('');
        return true;
      }
      setErrorMessage('Invalid e-mail.');
      return false;
    } else {
      setErrorMessage('E-mail is empty');
      return false;
    }
  };
  const onEmailBlur = () => {
    if (email) setErrorMessage(validateEmail(email) ? '' : 'Invalid e-mail.');
    else {
      setErrorMessage('E-mail is empty');
    }
  };
  const resetButtonClick = () => {
    if (validateEmailField()) {
      setIsSuccess(true);
    }
  };

  const classes = useStyles();
  return <div className="login-content">
      <div className="forgot-title">
        <FontAwesomeIcon style={{ cursor: 'pointer' }} onClick={props.onBackClick} icon={faArrowLeft} />
        <Typography className={classes.title} variant="h5" component="h2">
          Forgot Password
        </Typography>
      </div>
      {isSuccess ? <>
          <FontAwesomeIcon style={{ margin: 'auto' }} icon={faCheckCircle} size="3x" color="green" />
          <h3>An e-mail has been successfully sent to {email}.</h3>
          <a onClick={props.onBackClick}>Login</a>
        </> : <>
          <TextField className={classes.textField} id="outlined-basic" value={email} onBlur={onEmailBlur} onChange={(e) => {
              setEmail(e.target.value);
            }} error={!!errorMessage} label="E-mail" variant="outlined" />
          {!!errorMessage && <span className="error-message">{errorMessage}</span>}
          <GradientButtonComponent onClick={resetButtonClick} className="button" variant="contained" color="primary">
            Reset password
          </GradientButtonComponent>
        </>}
    </div>;
};
