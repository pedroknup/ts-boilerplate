import * as React from 'react';
import './styles.scss';
import { TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';

interface IInputProps {
  errorMessage?: string;
}
export const InputComponent = (props: TextFieldProps & IInputProps) => {
  return (
    <div className="input">
      <TextField {...props} error={!!props.errorMessage} />
      {props.errorMessage && <span className="input-error">{props.errorMessage}</span>}
    </div>
  );
};
