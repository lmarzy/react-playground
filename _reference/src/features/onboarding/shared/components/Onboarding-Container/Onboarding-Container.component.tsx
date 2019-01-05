import * as React from 'react';
import * as styles from './styles.scss';

import { ProgressBar } from '../Progress-Bar/Progress-Bar.component';

interface OnboardingContainerProps {
  status: {
    aboutYou: string;
    yourBudget: string;
    breathingSpace: string;
  };
  children: React.ReactNode;
}

export const OnboardingContainer = (props: OnboardingContainerProps): JSX.Element => (
  <React.Fragment>
    <ProgressBar status={props.status} />
    <div>{props.children}</div>
  </React.Fragment>
);
