import * as React from 'react';
import { Icon } from '..';

import * as styles from './styles.scss';

interface TransactionInfoProps {
  from: string;
  amount: string;
  date: string;
  description?: string;
  recurring: string;
  accountTo: string;
}

export const TransactionInfo = ({ from, amount, date, description, recurring, accountTo }: TransactionInfoProps) => (
  <div className={styles.transactionInfo}>
    <div className={styles.icon}>
      <Icon name="earnings-income" />
    </div>
    <div className={styles.body}>
      <dl>
        <dt className={styles.term}>Transaction from</dt>
        <dd className={styles.from}>{from}</dd>
        <dt className={styles.term}>Transaction Amount</dt>
        <dd className={styles.amount}>&pound;{amount}</dd>
        <dt className={styles.term}>Date</dt>
        <dd className={styles.date}>{date}</dd>
        {description && (
          <>
            <dt className={styles.descTerm}>Description:</dt>
            <dd className={styles.desc}>{description}</dd>
          </>
        )}
        <dt className={styles.term}>Recurring</dt>
        <dd className={styles.recurring}>{recurring} recurring</dd>
        <dt className={styles.term}>Transaction account</dt>
        <dd>{accountTo}</dd>
      </dl>
    </div>
  </div>
);
