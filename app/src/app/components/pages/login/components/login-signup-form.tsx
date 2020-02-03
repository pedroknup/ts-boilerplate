import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import './styles.scss';
import { InputComponent } from '../../../shared/input/input.component';
import { validateEmail } from 'app/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
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

type error = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
interface values {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ILoginFormProps {
  isLoading?: boolean;
  onLogin?: () => void;
  onSignInClick: () => void;
}
const noError: error = { firstName: '', lastName: '', email: '', password: '' };
const initialInputValues: values = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
};
export const LoginSignUpForm = (props: ILoginFormProps) => {
  const classes = useStyles();
  const [errors, setErrors] = React.useState<error>(noError);
  const [inputValues, setInputValues] = React.useState<values>(initialInputValues);

  const cleanFields = () => {
    setErrors(noError);
    setInputValues(initialInputValues);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const updatedValue = { ...inputValues };
    const inputName = e.currentTarget.name;
    if (
      inputName === 'firstName' ||
      inputName === 'lastName' ||
      inputName === 'email' ||
      inputName === 'password' ||
      inputName === 'confirmPassword'
    ) {
      updatedValue[inputName] = e.currentTarget.value;
      setInputValues(updatedValue);
    }
  };

  const validateNameValue = (name: string): string => {
    const nameTrimmed = name.trim();
    if (!nameTrimmed) return 'This field is mandatory';

    return nameTrimmed.length >= 3 ? '' : 'Invalid name';
  };

  const validatePasswordValue = (password: string) => {
    if (!password) return 'This field is mandatory';
    return password.length >= 6 ? '' : 'Password too short';
  };

  const validateConfirmPasswordValue = (password: string) => {
    if (!password) return 'This field is mandatory';
    return inputValues.password != password ? "The passwords doesn't match" : '';
  };

  const validateEmailValue = (email: string): string => {
    const emailTrimmed = email.trim();
    if (!emailTrimmed) return 'This field is mandatory';

    return validateEmail(email) ? '' : 'Invalid e-mail';
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const updatedErrors = { ...errors };
    const inputName = e.currentTarget.name;
    const value = e.currentTarget.value;
    console.log(inputName, value);
    switch (inputName) {
      case 'firstName':
      case 'lastName':
        updatedErrors[inputName] = validateNameValue(value);
        break;
      case 'email':
        updatedErrors.email = validateEmailValue(value);
        break;
      case 'password':
        updatedErrors.password = validatePasswordValue(value);
        break;
      case 'confirmPassword':
        updatedErrors.password = validateConfirmPasswordValue(value);
        break;
    }
    setErrors(updatedErrors);
  };

  const onSubmit = () => {
    cleanFields();
  };

  return <div className="login-content">
      <div className="forgot-title">
        <FontAwesomeIcon style={{ cursor: 'pointer' }} onClick={props.onSignInClick} icon={faArrowLeft} />
        <Typography className={classes.title} variant="h5" component="h2">
          Create an account
        </Typography>
      </div>
      <InputComponent className={classes.textField} id="outlined-basic" errorMessage={errors.firstName} value={inputValues.firstName} name={'firstName'} label="First Name" variant="outlined" onBlur={handleBlur} onChange={handleChange} />
      <InputComponent className={classes.textField} id="outlined-basic" label="Last Name" variant="outlined" onBlur={handleBlur} onChange={handleChange} value={inputValues.lastName} name={'lastName'} errorMessage={errors.lastName} />
      <InputComponent className={classes.textField} id="outlined-basic" label="E-mail" variant="outlined" onBlur={handleBlur} onChange={handleChange} value={inputValues.email} name={'email'} errorMessage={errors.email} />

      <InputComponent className={classes.textField} id="outlined-basic" label="Password" type="password" variant="outlined" onBlur={handleBlur} onChange={handleChange} value={inputValues.password} name={'password'} errorMessage={errors.password} />
      <InputComponent className={classes.textField} id="outlined-basic" label="Confirm Password" type="password" variant="outlined" onBlur={handleBlur} onChange={handleChange} value={inputValues.confirmPassword} name={'confirmPassword'} errorMessage={errors.password} />
      <GradientButtonComponent onClick={onSubmit} className="button" variant="contained" color="primary">
        Sign Up
      </GradientButtonComponent>

      <span className="create-account">
        Have an account already? <a onClick={props.onSignInClick}>Log in</a>
      </span>
    </div>;
};
