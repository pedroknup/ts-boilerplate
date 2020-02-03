import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { TextField, Fab, FormControlLabel, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './styles.scss';
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
  onLogin?: (email: string, password: string) => void;
  onSignUpClick: () => void;
  onForgotClick: () => void;
  errorMsg?: string;
}
export const LoginSignInForm = (props: ILoginFormProps) => {
  const classes = useStyles();
  const [email, setEmail] = React.useState('admin@admin.com');
  const [password, setPassword] = React.useState('123123');
  const { errorMsg } = props;
  return <div className="login-content">
      <Typography className={classes.title} variant="h5" component="h2">
        Sign in into your account
      </Typography>

      <TextField className={classes.textField} id="outlined-basic" onChange={(e) => {
          setEmail(e.currentTarget.value);
        }} label="E-mail" value={email} variant="outlined" />
      <TextField onChange={(e) => {
          setPassword(e.currentTarget.value);
        }} className={classes.textField} id="outlined-basic" label="Password" type="password" value={password} variant="outlined" />
      {errorMsg && <span style={{ color: 'red', margin: '8px 0', textAlign: 'left' }}>
          {errorMsg}
        </span>}
      <GradientButtonComponent onClick={() => {
          props.onLogin && props.onLogin(email, password);
        }} disabled={props.isLoading} className="button" variant="contained" color="primary">
        Sign In
      </GradientButtonComponent>
      <div className="actions">
        <FormControlLabel control={<Checkbox value="checkedB" color="primary" /> // onChange={handleChange('checkedB')} // checked={state.checkedB}
          } label="Remember Me" />
        <a onClick={props.onForgotClick}>Forgot Password?</a>
      </div>
      <span className="or">
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {' OR '}
        </Typography>
      </span>
      <div className="social-buttons">
        <Fab disabled={props.isLoading} className="button button-facebook">
          <FontAwesomeIcon size="lg" icon={faFacebookF} />
        </Fab>
        <Fab disabled={props.isLoading} className="button button-google">
          <FontAwesomeIcon icon={faGoogle} />
        </Fab>

        <Fab disabled={props.isLoading} className="button button-twitter">
          <FontAwesomeIcon icon={faTwitter} />
        </Fab>
        <Fab disabled={props.isLoading} className="button button-linkedin">
          <FontAwesomeIcon icon={faLinkedin} />
        </Fab>
      </div>
      <span className="create-account">
        Don't have an account? <a onClick={props.onSignUpClick}>Create an account</a>
      </span>
    </div>;
};
