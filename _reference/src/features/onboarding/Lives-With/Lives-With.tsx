import * as React from 'react';
import * as styles from './styles.scss';

import { PageHeader, InputCheckbox, CounterComponent, Button } from '../../../shared/components';
import { LivesWithModel } from './lives-with.model';
import { onboardingAnalyticsService } from '../onboarding-analytics.service';

export enum LivesWithOptions {
  Children,
  DependentAdults,
  OtherAdults,
  YoungAdults,
}

export const initialState = {
  children: 0,
  dependentAdults: 0,
  otherAdults: 0,
  youngAdults: 0,
  partner: false,
} as { [key: string]: any };

export interface ComponentProps {
  livesWithData: LivesWithModel;
  onSubmit: (livesWithData: LivesWithModel) => void;
}

export type LivesWithComponentProps = ComponentProps;
export type LivesWithComponentState = Readonly<typeof initialState>;

export const onPartnerCheckedChange = (prevState: LivesWithComponentState): LivesWithComponentState => {
  const newState = { ...prevState };
  newState.partner = !newState.partner;
  return newState;
};

export const onIncrementPersonLivesWith = (
  prevState: LivesWithComponentState,
  personLivesWithId: string,
): LivesWithComponentState => {
  const newState = { ...prevState };
  newState[personLivesWithId] += 1;
  return newState;
};

export const onDecrementPersonLivesWith = (
  prevState: LivesWithComponentState,
  personLivesWithId: string,
): LivesWithComponentState => {
  const newState = { ...prevState };
  newState[personLivesWithId] -= 1;
  return newState;
};

export const setStateFromProps = (
  prevState: LivesWithComponentState,
  newProps: LivesWithComponentProps,
): LivesWithComponentState => {
  const newState = { ...prevState };
  const { children, dependentAdults, otherAdults, partner, youngAdults } = newProps.livesWithData;
  newState.children = children;
  newState.dependentAdults = dependentAdults;
  newState.otherAdults = otherAdults;
  newState.partner = partner;
  newState.youngAdults = youngAdults;
  return newState;
};

export class LivesWithComponent extends React.Component<LivesWithComponentProps, LivesWithComponentState> {
  readonly state: LivesWithComponentState = initialState;

  constructor(props: LivesWithComponentProps) {
    super(props);
    this.state = props.livesWithData;
  }

  componentWillReceiveProps(newProps: LivesWithComponentProps): void {
    if (newProps !== this.state) {
      this.setState(setStateFromProps(this.state, newProps));
    }
  }

  handlePartnerCheckedChange = (): void => {
    onboardingAnalyticsService.aboutYouConfirmPartner();
    this.setState(onPartnerCheckedChange(this.state));
  };

  handleIncrement = (choice: string): void => this.setState(onIncrementPersonLivesWith(this.state, choice));

  handleDecrement = (choice: string): void => this.setState(onDecrementPersonLivesWith(this.state, choice));

  handleThatsEveryoneSubmit = (event: React.FormEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const { partner, children, youngAdults, dependentAdults, otherAdults } = this.state;
    const data: LivesWithModel = { children, dependentAdults, otherAdults, partner, youngAdults };
    this.props.onSubmit(data);
  };

  render(): React.ReactNode {
    const { children, youngAdults, dependentAdults, otherAdults, partner } = this.state;

    return (
      <div className="l-container">
        <PageHeader type="main" text="Who lives with you?" />
        <main>
          <form>
            <fieldset>
              <legend className="u-hidden-visually">Who lives with you?</legend>
              <div className={`${styles.item} ${styles.mePartner}`}>
                <InputCheckbox
                  label="Me"
                  id="lives-with-me"
                  name="lives-with-me"
                  value="lives-with-me"
                  checked={true}
                />
              </div>
              <div className={`${styles.item} ${styles.mePartner}`}>
                <InputCheckbox
                  label="My Partner"
                  id="lives-with-partner"
                  name="lives-with-partner"
                  value="lives-with-partner"
                  checked={partner}
                  onChange={this.handlePartnerCheckedChange}
                />
              </div>
              <div className={styles.item}>
                <CounterComponent
                  label="Child(16-18)"
                  id="children"
                  value={children}
                  maxValue={15}
                  handleIncrement={() => this.handleIncrement('children')}
                  handleDecrement={() => this.handleDecrement('children')}
                />
              </div>
              <div className={styles.item}>
                <CounterComponent
                  label="Young adult(16-18)"
                  id="young-adults"
                  value={youngAdults}
                  maxValue={15}
                  handleIncrement={() => this.handleIncrement('youngAdults')}
                  handleDecrement={() => this.handleDecrement('youngAdults')}
                />
              </div>
              <div className={styles.item}>
                <CounterComponent
                  label="Dependent adults"
                  id="dependent-adults"
                  value={dependentAdults}
                  maxValue={15}
                  handleIncrement={() => this.handleIncrement('dependentAdults')}
                  handleDecrement={() => this.handleDecrement('dependentAdults')}
                />
                <p>People who are over 18 who rely on you as their primary source of income</p>
              </div>
              <div className={`${styles.item} ${styles.itemLast}`}>
                <CounterComponent
                  label="Other adults"
                  id="other-adults"
                  value={otherAdults}
                  maxValue={15}
                  handleIncrement={() => this.handleIncrement('otherAdults')}
                  handleDecrement={() => this.handleDecrement('otherAdults')}
                />
                <p>Such as housemates, tenants etc</p>
              </div>

              <div className="u-bg-path path-3 u-mb3">
                <Button type="submit" primary main onClick={this.handleThatsEveryoneSubmit}>
                  That's everyone
                </Button>
              </div>
            </fieldset>
          </form>
        </main>
      </div>
    );
  }
}
