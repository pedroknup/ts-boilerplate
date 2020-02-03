import * as React from 'react';
import './styles.scss';
import { SettingsContainerProps } from '../containers';
export interface ISettingsComponentProps extends SettingsContainerProps {}

export const SettingsComponent = () => {
  return <div className="settings-container">SETTINGS</div>;
};
