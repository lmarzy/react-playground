import * as React from 'react';
import { Icon } from '..';
import * as styles from './styles.scss';

export interface AccordionProps {
  icon?: string;
  title: string;
  status: {
    isActive: boolean;
    isComplete?: boolean;
  };
  completeText?: string;
  invalidText?: string;
  children: React.ReactNode;
  showIcon?: boolean;
  handleToggle?: () => void;
}

export const AccordionItem = ({
  icon,
  title,
  status,
  completeText,
  invalidText,
  children,
  handleToggle,
  showIcon = true,
}: AccordionProps) => {
  let headerClasss = `${styles.header}`;

  if (status.isActive) headerClasss += ` ${styles.active}`;

  return (
    <React.Fragment>
      <dt className={headerClasss}>
        <button className={styles.button} onClick={() => handleToggle()}>
          {icon && <Icon name={icon} />}
          <span className={styles.title}>{title}</span>
          <Icon name="arrow-down" />
        </button>
        {invalidText && (
          <p className={styles.invalid}>
            <Icon name="alert" color="plum" /> {invalidText}
          </p>
        )}
        {status.isComplete && completeText !== undefined && showIcon && (
          <p className={styles.complete}>
            <Icon name="tick" color="forrest" /> {completeText}
          </p>
        )}
      </dt>
      {status.isActive && <dd className={styles.body}>{children}</dd>}
    </React.Fragment>
  );
};
