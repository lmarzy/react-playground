import * as React from 'react';
import * as styles from './styles.scss';

interface ProgressBarProps {
  status: {
    aboutYou: string;
    yourBudget: string;
    breathingSpace: string;
  };
}
export const ProgressBar = (props: ProgressBarProps): JSX.Element => {
  const { aboutYou, yourBudget, breathingSpace } = props.status;

  const listItems = [
    {
      id: 1,
      text: 'About You',
      class: aboutYou !== 'inActive' ? (aboutYou === 'active' ? styles.active : styles.complete) : styles.inActive,
    } as ListItemsInterface,
    {
      id: 2,
      text: 'Your Budget',
      class: yourBudget !== 'inActive' ? (yourBudget === 'active' ? styles.active : styles.complete) : styles.inActive,
    } as ListItemsInterface,
    {
      id: 3,
      text: 'Breathing Space',
      class:
        breathingSpace !== 'inActive'
          ? breathingSpace === 'active'
            ? styles.active
            : styles.complete
          : styles.inActive,
    } as ListItemsInterface,
  ];

  const items = listItems.map((item, i) => (
    <li key={item.id} className={item.class}>
      {item.text}
    </li>
  ));

  return <ol className={styles.container}>{items}</ol>;
};

interface ListItemsInterface {
  id: number;
  text: string;
  class: string;
}
