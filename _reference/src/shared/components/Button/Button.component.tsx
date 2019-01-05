import * as React from 'react';
import Classnames from 'classnames';
import { Icon } from '../../../shared/components';
import * as styles from './styles.scss';

export interface ButtonProps {
  type: string;
  primary?: boolean;
  secondary?: boolean;
  main?: boolean;
  alt?: boolean;
  invert?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: any;
}
export const Button = ({
  type,
  primary,
  secondary,
  main,
  alt,
  disabled,
  invert,
  fullWidth,
  children,
  onClick,
}: ButtonProps) => {
  const buttonCx = Classnames(styles.button, {
    [styles.primary]: primary,
    [styles.secondary]: secondary,
    [styles.main]: main,
    [styles.alt]: alt,
    [styles.invert]: invert,
    [styles.fullWidth]: fullWidth,
    [styles.disabled]: disabled,
  });

  return (
    <button type={type} className={buttonCx} disabled={disabled} onClick={onClick}>
      <span>{children}</span>
      {((primary && main && !invert) || (primary && disabled && !invert)) && <Icon name="arrow-right" color="white" />}
      {primary && invert && <Icon name="arrow-right" />}
    </button>
  );
};
