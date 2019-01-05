import * as React from 'react';
import * as styles from './styles.scss';

interface StepProps {
  title: string;
  detail: string;
  active: boolean;
}

export const Step = ({ title, detail, active }: StepProps) => {
  let stepClasses = `${styles.step}`;

  if (active) stepClasses += ` ${styles.active}`;

  return (
    <li className={stepClasses}>
      <div className={styles.inner}>
        <span className={styles.title}>{title}</span>
        {active && <span className={styles.detail}>{detail}</span>}
      </div>
    </li>
  );
};
