import * as React from 'react';
import './styles.scss';

export interface ButtonProps {
  type: string;
  style: string;
  fullWidth?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}
export const Button = ({ type, style, disabled, fullWidth, children, onClick }: ButtonProps) => {
  let buttonStyles = `button button--${style}`;

  if (fullWidth) buttonStyles += ' full-width';

  return (
    <button type={type} className={buttonStyles} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};
