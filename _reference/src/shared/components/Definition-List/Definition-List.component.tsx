import * as React from 'react';
import { Icon } from '../Icon/Icon.component';
import * as styles from './styles.scss';

interface Items {
  icon?: string;
  label: string;
  value: string;
}

export interface DefinitionListProps {
  items: Items[];
}

export const DefinitionList = ({ items }: DefinitionListProps) => (
  <dl className={items[0].icon && styles.list}>
    {items.map(item => (
      <React.Fragment>
        <dt className={styles.label}>
          {item.icon && <Icon name={item.icon} color={item.icon === 'tick' ? 'forrest' : 'plum'} />}
          <span>{item.label}:</span>
        </dt>
        <dd className={styles.value}>{item.value}</dd>
      </React.Fragment>
    ))}
  </dl>
);
