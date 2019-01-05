import * as React from 'react';
import { Icon } from '../Icon/Icon.component';

import * as styles from './styles.scss';

interface PillProps {
  icon: string;
  text: string;
  onClick?: any;
}

export const Pill = ({ icon, text, onClick }: PillProps) => (
  <div className={styles.pill}>
    <Icon name={icon} color={icon === 'tick' ? 'forrest' : 'plum'} />
    <span className={styles.text} onClick={onClick} role="button">
      {text}
    </span>
  </div>
);
