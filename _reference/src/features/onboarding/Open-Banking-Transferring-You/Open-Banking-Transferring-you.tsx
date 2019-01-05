import * as React from 'react';
import { PageHeader } from '../../../shared/components';

import * as styles from './styles.scss';

interface OpenBankingTransferringYouProps {
  firstName: string;
}

export const OpenBankingTransferringYou = ({ firstName }: OpenBankingTransferringYouProps) => (
  <div className="l-container u-align-center">
    <header className={styles.header}>
      <img src="/assets/images/balloon_icon.png" alt="Balloon Icon" className={styles.balloon} />
      <div className={styles.loading} aria-hidden="true" />
      <h1 className={styles.title}>See you soon, {firstName}!</h1>
    </header>

    <main className="u-align-center">
      <p className="u-bold">Securely transferring you to</p>
      <img src="/assets/images/openwrks-logo.svg" alt="OpenWrks Logo" className={styles.openwrks} />
    </main>
  </div>
);
