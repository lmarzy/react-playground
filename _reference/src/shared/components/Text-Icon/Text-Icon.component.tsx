import * as React from 'react';
import { Icon } from '../Icon/Icon.component';

import * as styles from './styles.scss';

interface TextIconProps {
  icon: string;
  text: string;
}

export const TextIcon = ({ icon, text }: TextIconProps) => (
  <p className={styles.textIcon}>
    <Icon name={icon} color={icon === 'tick' ? 'forrest' : 'plum'} />
    <span>{text}</span>
  </p>
);
