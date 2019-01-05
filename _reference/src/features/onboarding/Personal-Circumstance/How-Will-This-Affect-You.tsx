import * as React from 'react';
import * as styles from './styles.scss';
import { Redirect } from 'react-router';
import { PageHeader, Button, Pill, TextLink, GridCol, GridRow } from '../../../shared/components';
import { OnboardingRoutes } from '../onboarding.routes';
import { AnalyticsContextConsumer } from '../../../shared/analytics';
const ComponentAnalyticsCategory = 'Assess and establish';

interface HowWillThisAffectYouProps {
  circumstances: string[];
  howThisWillAffectYouSubmit: (circumstancesAreVunerableFlag: boolean) => void;
}

const onProbablyClicked = (callToAction: (category: string, label: string) => void, onContinue: () => void): void => {
  callToAction(ComponentAnalyticsCategory, '6.16-timing-yes');
  onContinue();
};

const onProbablyNotClicked = (
  callToAction: (category: string, label: string) => void,
  onContinue: () => void,
): void => {
  callToAction(ComponentAnalyticsCategory, '6.17-timing-no');
  onContinue();
};

const onSkipped = (navigation: (category: string, label: string) => void): void => {
  navigation(ComponentAnalyticsCategory, '6.18-timing-skip');
};

export const HowWillThisAffectYouComponent = (props: HowWillThisAffectYouProps): JSX.Element => {
  return props.circumstances.length > 0 ? (
    <AnalyticsContextConsumer>
      {({ callToAction, navigation }) => (
        <div className="l-container">
          <PageHeader
            type="main"
            text="Will any of the circumstances below still be affecting your household finances in 6 months time?"
          />

          <main className="u-align-center">
            <ul className={styles.effectYou}>
              {props.circumstances.map(c => (
                <li key={c}>
                  <Pill icon="tick" text={c} />
                </li>
              ))}
            </ul>

            <div className="u-mb-m">
              <GridRow>
                <GridCol>
                  <div className="u-align-right">
                    <Button
                      type="button"
                      secondary
                      main
                      onClick={() => onProbablyClicked(callToAction, () => props.howThisWillAffectYouSubmit(true))}
                    >
                      Probably
                    </Button>
                  </div>
                </GridCol>
                <GridCol>
                  <div className="u-align-left">
                    <Button
                      type="button"
                      secondary
                      main
                      onClick={() => onProbablyNotClicked(callToAction, () => props.howThisWillAffectYouSubmit(false))}
                    >
                      Probably not
                    </Button>
                  </div>
                </GridCol>
              </GridRow>
            </div>

            <TextLink
              to={OnboardingRoutes.OpenBankingIntro}
              text="Skip and we won't keep a record of this information"
              onClick={() => onSkipped(navigation)}
            />
          </main>
        </div>
      )}
    </AnalyticsContextConsumer>
  ) : (
    <Redirect to={OnboardingRoutes.PersonalCircumstance} />
  );
};
