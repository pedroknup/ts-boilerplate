import * as React from 'react';
import './styles.scss';
import { TextFieldProps } from '@material-ui/core/TextField';
import { Card, CardActions, CardContent } from '@material-ui/core';
import { faDashcube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faQuestionCircle,
  faSignOutAlt,
  faTools,
  faTimes,
  faCheck,
  faCheckSquare
} from '@fortawesome/free-solid-svg-icons';
import { SidebarContainerProps } from '../containers';
import { RouteComponentProps } from 'react-router';
import ReactDOM from 'react-dom';
const Logo = require('../../../../assets/logo.png');
export interface ISidebarComponentProps {
  currentPath?: string;
}

interface ISidebarItem {
  text: string;
  icon: any;
  path: string;
}

const privateMenu: ISidebarItem[] = [
  { text: 'Home', icon: faHome, path: '/' },
  { text: 'To-dos', icon: faCheckSquare, path: '/to-dos' },
  { text: 'Settings', icon: faTools, path: '/settings' },
  { text: 'About', icon: faQuestionCircle, path: '/about' }
];

const MOBILE_BREAKPOINT = 574;
export const SidebarComponent = (
  props: ISidebarComponentProps & RouteComponentProps & SidebarContainerProps
  // props: ISidebarComponentProps
) => {
  const [internalExpanded, setInternalExpanded] = React.useState(props.isExpanded);
  const sidebarClasses = `sidebar ${props.isOpened ? 'open' : ''} ${
    internalExpanded ? 'expanded' : ''
  }`;
  const sidebarContainerClasses = `sidebar-container ${props.isOpened ? 'open' : ''} ${
    internalExpanded ? 'expanded' : ''
  }`;
  React.useEffect(
    () => {
      setInternalExpanded(props.isExpanded);
    },
    [props.isExpanded]
  );

  const closeIfMobile = () => {
    if (props.winWidth && props.winWidth < MOBILE_BREAKPOINT) {
      props.toggleSidebarOpened && props.toggleSidebarOpened();
    }
  };

  React.useEffect(
    () => {
      console.log(props.history);
    },
    [props.history]
  );

  return (
    <div
      className={
        sidebarContainerClasses // }} //   if (!props.isExpanded) setInternalExpanded(false); // onMouseLeave={() => { // }} //   if (!props.isExpanded) setInternalExpanded(true); // onMouseEnter={() => {
      }
    >
      <div className={sidebarClasses}>
        <div>
          <span className="sidebar-item logo">
            <img src={'https://image.flaticon.com/icons/png/512/919/919832.png'} />
            {<span className="sidebar-item-title">Boilerplate</span>}

            <FontAwesomeIcon
              onClick={() => {
                props.toggleSidebarOpened && props.toggleSidebarOpened();
              }}
              className="close-sidebar"
              size="sm"
              icon={faTimes}
            />
          </span>

          {privateMenu.map((item, key) => (
            <span
              key={key}
              onClick={() => {
                props.history.push(item.path);
                closeIfMobile();
              }}
              className={`sidebar-item ${props.location.pathname === item.path ? 'active' : ''}`}
            >
              <FontAwesomeIcon size="sm" icon={item.icon} />
              {<span className="sidebar-item-title">{item.text}</span>}
            </span>
          ))}

          <span
            onClick={() => {
              props.logout && props.logout();
            }}
            className="sidebar-item"
          >
            <FontAwesomeIcon size="sm" icon={faSignOutAlt} />
            {<span className="sidebar-item-title">Sign out</span>}
          </span>
        </div>
        {/* <span className="sidebar-item-title footer">{props.location.pathname}</span> */}
        <span className="sidebar-item-title footer">Developed with ❤ by Pedro Knup</span>
      </div>
    </div>
  );
};
