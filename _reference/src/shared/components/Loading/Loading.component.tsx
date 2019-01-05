import * as React from 'react';
import * as styles from './styles.scss';

export const Loading = () => (
  <div className={styles.loading}>
    <div className={styles.logo}>
      <img src="/assets/images/logo.svg" alt="Tully Logo" />
    </div>
  </div>
);
