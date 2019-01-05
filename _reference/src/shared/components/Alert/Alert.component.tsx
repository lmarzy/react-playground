import * as React from 'react';
import { Icon } from '../Icon/Icon.component';
import * as styles from './styles.scss';

export interface AlertProps {
  id?: string;
  arrow?: string;
  error?: boolean;
  children: React.ReactNode;
  handleClose?: () => void;
}

export const Alert = ({ id, arrow, error, children, handleClose }: AlertProps) => {
  // @ts-ignore
  let alertStyles = styles.alert;

  // @ts-ignore
  if (arrow) alertStyles += ` ${styles[`arrow${arrow}`]}`;

  // @ts-ignore
  if (handleClose) alertStyles += ` ${styles.hasCloseBtn}`;

  if (error) alertStyles += ` ${styles.error}`;

  return (
    <div id={id} className={alertStyles}>
      {handleClose && (
        <button type="button" className={styles.closeBtn} onClick={handleClose}>
          <span className="u-hidden-visually">Close Modal</span>
          <Icon name="cross" color="white" />
        </button>
      )}
      {children}
    </div>
  );
};
