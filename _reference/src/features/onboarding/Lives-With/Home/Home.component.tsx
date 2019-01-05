import * as React from 'react';
import * as styles from './styles.scss';
import { RouteComponentProps, withRouter } from 'react-router';
import { PageHeader, Video } from '../../../shared/components';
import { OnboardingRoutes } from '../onboarding.routes';
import { AnalyticsContextConsumer } from '../../../shared/analytics';
const ComponentAnalyticsCategory = 'Process';

const onVideoStarted = (play: (category: string, label: string) => void): void => {
  play(ComponentAnalyticsCategory, '3.1-play-video2');
};

const onWatchNow = (callToAction: (category: string, label: string) => void): void => {
  callToAction(ComponentAnalyticsCategory, '3.2-watch-now');
};

const onWatchLater = (callToAction: (category: string, label: string) => void, onContinue: () => void): void => {
  callToAction(ComponentAnalyticsCategory, '3.3-watch-later');
  onContinue();
};

const onVideoWatched = (callToAction: (category: string, label: string) => void, onContinue: () => void): void => {
  callToAction(ComponentAnalyticsCategory, '3.4-video-watched');
  onContinue();
};

const HomeComponent = (props: RouteComponentProps) => (
  <AnalyticsContextConsumer>
    {({ callToAction, play }) => (
      <div className={styles.page}>
        <div className="l-container">
          <PageHeader type="main" text="Great, we're all set" />

          <main>
            <p className="u-h2 u-mb-m">
              It may take some time but we'll work together to get you the breathing space you need.
            </p>
            <p className="u-pIntro u-mb-m">Here's what to expect...</p>
            <Video
              id={2}
              continueText="Show me the steps"
              onWatchLater={() => onWatchLater(callToAction, () => props.history.push(OnboardingRoutes.Steps))}
              onWatchNow={() => onWatchNow(callToAction)}
              onVideoStarted={() => onVideoStarted(play)}
              onVideoWatched={() => onVideoWatched(callToAction, () => props.history.push(OnboardingRoutes.Steps))}
            />
          </main>
        </div>
      </div>
    )}
  </AnalyticsContextConsumer>
);

export default withRouter(HomeComponent);
