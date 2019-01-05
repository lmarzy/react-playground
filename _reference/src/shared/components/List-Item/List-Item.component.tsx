import * as React from 'react';
import { Icon } from '../Icon/Icon.component';
import * as styles from './styles.scss';

export interface ListItemProps {
  positive?: boolean;
  negative?: boolean;
  text: string;
}

export const ListItem = ({ positive, negative, text }: ListItemProps) => (
  <li className={styles.listItem}>
    {positive && <Icon name="tick" color="forrest" />}
    {negative && <Icon name="cross" color="plum" />}
    <span>{text}</span>
  </li>
);
