import * as React from 'react';
import * as styles from './styles.scss';
import { PageHeader, Video, Alert } from '../../../shared/components';
import { AnalyticsContextConsumer } from '../../../shared/analytics';

const ComponentAnalyticsCategory = 'Intro';

interface HomeComponentProps {
  userFirstName: string;
  howWeMakeMoneyActive: boolean;
  onContinue: () => void;
  onToggleHowDoWeMakeMoney: () => void;
}

const onWatchNow = (callToAction: (category: string, label: string) => void): void => {
  callToAction(ComponentAnalyticsCategory, '1.1-watch-now');
};

const onWatchLater = (callToAction: (category: string, label: string) => void, onContinue: () => void): void => {
  callToAction(ComponentAnalyticsCategory, '1.2-watch-later');
  onContinue();
};

const onIntroInfoLinkClick = (
  navigation: (category: string, label: string) => void,
  onToggleHowDoWeMakeMoney: () => void,
): void => {
  navigation(ComponentAnalyticsCategory, '1.3-intro-info-link');
  onToggleHowDoWeMakeMoney();
};

const onVideoStarted = (play: (category: string, label: string) => void): void => {
  play(ComponentAnalyticsCategory, '1.4-play-video1');
};

const onVideoWatched = (callToAction: (category: string, label: string) => void, onContinue: () => void): void => {
  callToAction(ComponentAnalyticsCategory, '1.5-video-watched');
  onContinue();
};

const HomeComponent: React.SFC<HomeComponentProps> = (props): JSX.Element => (
  <AnalyticsContextConsumer>
    {({ callToAction, navigation, play }) => (
      <React.Fragment>
        <div className={styles.page}>
          <div className="l-container">
            <PageHeader type="main" text="Let's get your budget built" />
            <main>
              <div className="u-mb-m">
                <Video
                  id={1}
                  continueText="Let's get started"
                  onWatchLater={() => onWatchLater(callToAction, props.onContinue)}
                  onWatchNow={() => onWatchNow(callToAction)}
                  onVideoStarted={() => onVideoStarted(play)}
                  onVideoWatched={() => onVideoWatched(callToAction, props.onContinue)}
                >
                  <p className="u-h2 u-col-forrest u-mb-m">
                    {props.userFirstName}, it looks like you may be eligible for breathing space.
                  </p>
                  <p className="u-pIntro u-mb-m">
                    We'll need to learn a bit more about you. But first, we'd like to introduce ourselves.
                  </p>
                </Video>
              </div>
              <div className={styles.tooltip}>
                <button
                  type="button"
                  className="u-link"
                  onClick={() => onIntroInfoLinkClick(navigation, props.onToggleHowDoWeMakeMoney)}
                >
                  How we make money
                </button>
                {props.howWeMakeMoneyActive && (
                  <Alert id="how-we-make-money" arrow="center" handleClose={props.onToggleHowDoWeMakeMoney}>
                    <p className="u-mb-s">We work for you but we are funded by the financial industry</p>
                    <p>We don't believe that it is right to charge fees to people who are in debt.</p>
                  </Alert>
                )}
              </div>
            </main>
          </div>
        </div>
      </React.Fragment>
    )}
  </AnalyticsContextConsumer>
);

export default HomeComponent;
