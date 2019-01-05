import * as React from 'react';
import { Alert } from '../../../../../../shared/components';
import * as styles from './styles.scss';

interface GoodToKnowProps {
  creditCheckStatus: boolean;
  toggleCreditCheck: () => void;
}

export const GoodToKnow = ({ creditCheckStatus, toggleCreditCheck }: GoodToKnowProps) => (
  <section className={styles.goodToKnow}>
    <h5 className="u-mb-s">Good to know</h5>
    <p className="u-mb-s">We will run a credit check but this will not change your credit score.</p>

    <div className={styles.alert}>
      <button className="u-link" onClick={toggleCreditCheck}>
        Why we run a credit check
      </button>

      {creditCheckStatus && (
        <Alert id="whyRunCreditCheck" arrow="left" handleClose={toggleCreditCheck}>
          <p>We run a credit check to...</p>
        </Alert>
      )}
    </div>
  </section>
);
