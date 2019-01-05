import * as React from 'react';
import * as styles from './styles.scss';

import { Button, PageHeader } from '../../../../shared/components';

export interface IdentityErrorComponentProps {
  referrerName: string;
  onJourneyEnd: () => void;
}

export const IdentityErrorComponent: React.SFC<IdentityErrorComponentProps> = ({
  referrerName,
  onJourneyEnd,
}): JSX.Element => (
  <section className={styles.container}>
    <div className="l-container">
      <PageHeader type="main" text="Sorry we haven't been able to confirm your identity" />
      <main>
        <h2 className="u-mb-s">We want to help, but hope you see why security is top priority for us.</h2>

        <p className="u-mb-s">Please contact {referrerName} to check whether they have got your details correct.</p>
        <Button type="button" secondary main onClick={onJourneyEnd}>
          Take me to {referrerName}
        </Button>
      </main>
    </div>
  </section>
);
