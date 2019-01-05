import * as React from 'react';
import * as styles from './styles.scss';

interface ListSimpleProps {
  listItems: string[];
  dotColour: string;
  listStyle: string;
}

export const ListSimple = ({ listItems, dotColour, listStyle }: ListSimpleProps) => {
  const listClass = `u-mb-s ${styles.list}`;
  return (
    <ul className={listClass} data-liststyle={listStyle} data-dotcolour={dotColour}>
      {listItems.map((listItem, i) => (
        <li key={i}>{listItem}</li>
      ))}
    </ul>
  );
};
