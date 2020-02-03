import * as React from 'react';
import './styles.scss';
import onClickOutside from 'react-onclickoutside';


interface IDropdownItem {
  content?: JSX.Element | string;
  onClick?: () => void;
  isDivider?: boolean;
}

interface IDropdownProps {
  children: any;
  items: IDropdownItem[];
}

interface IInternalDropdownProps {
  isOpen: boolean;
  onClick: () => void;
}
const DropdownRawComponent = (props: IDropdownProps & IInternalDropdownProps) => {
  return (
    <div className="dropdown">
      <div
        className="dropdown-content"
        onClick={() => {
          props.onClick();
        }}
      >
        {props.children}
      </div>
      <div className={`dropdown-tooltip ${props.isOpen ? 'open' : ''}`}>
        {props.items.map((item, key) => (
          <span
            onClick={() => {
              item.onClick && item.onClick();
            }}
            key={key}
            className={item.isDivider ? 'divider' : !item.onClick ? 'disabled' : 'item'}
          >
            {item.content}
          </span>
        ))}
      </div>
    </div>
  );
};

const DropdownOutsideClick = onClickOutside(DropdownRawComponent);

const DropdownComponent = (props: IDropdownProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <DropdownOutsideClick
      onClick={() => setIsOpen(!isOpen)}
      isOpen={isOpen}
      handleClickOutside={() => {
        setIsOpen(false);
      }}
      {...props}
    />
  );
};
export { DropdownComponent };
