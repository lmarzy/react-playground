import * as React from 'react';
import { Icon } from '../Icon/Icon.component';
import * as styles from './styles.scss';

export interface AlertProps {
  type: string;
  text: string;
  icon?: string;
}

export const PageHeader = ({ type, text, icon }: AlertProps) => {
  // @ts-ignore
  let pageHeaderStyles = `${styles.pageHeader} `;

  if (type === 'alt') pageHeaderStyles += styles.alt;

  return (
    <header className={pageHeaderStyles}>
      {icon && <Icon name={icon} color={type === 'main' ? 'forest' : 'white'} />}
      <h1>{text}</h1>
    </header>
  );
};
