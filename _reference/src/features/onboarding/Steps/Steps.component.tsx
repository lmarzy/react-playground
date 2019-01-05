import * as React from 'react';
import * as styles from './styles.scss';
import { Button, PageHeader, Steps } from '../../../shared/components';
import { withRouter, RouteComponentProps } from 'react-router';
import { OnboardingRoutes } from '../onboarding.routes';
import { AnalyticsContextConsumer } from '../../../shared/analytics';
const ComponentAnalyticsCategory = 'Process';

const onClicked = (callToAction: (category: string, label: string) => void, onContinue: () => void): void => {
  callToAction(ComponentAnalyticsCategory, '4.1-section-1');
  onContinue();
};

const StepsComponent = (props: RouteComponentProps): JSX.Element => (
  <AnalyticsContextConsumer>
    {({ callToAction }) => (
      <div className={styles.page}>
        <PageHeader type="main" text="3 simple steps" />

        <main>
          <Steps stepComplete={0} />
          <Button
            type="button"
            primary
            main
            invert
            onClick={() => onClicked(callToAction, () => props.history.push(OnboardingRoutes.LivesWith))}
          >
            Excellent, let's go
          </Button>
        </main>
      </div>
    )}
  </AnalyticsContextConsumer>
);

export default withRouter(StepsComponent);
