import * as React from 'react';
import * as styles from './styles.scss';

import { RouteComponentProps } from 'react-router';
import { PageHeader, Button, TextLink, Alert, CheckboxButton } from '../../../shared/components';
import { CircumstanceModel } from './circumstance.model';
import { OnboardingRoutes } from '../onboarding.routes';
import { onboardingAnalyticsService } from '../onboarding-analytics.service';

interface CircumstanceViewModel extends CircumstanceModel {
  isChecked: boolean;
}

type ComponentProps = {
  circumstances: CircumstanceModel[];
  firstName: string;
  onCircumstancesConfirmed: (models: CircumstanceModel[]) => void;
  onNoneOfTheseSelected: () => void;
} & Partial<DefaultProps>;

type DefaultProps = Readonly<typeof defaultProps>;

const defaultProps = {
  circumstancesForMember: [] as CircumstanceModel[],
};

const initialState = {
  showWhyWeAskYouThis: false,
  circumstancesViewModels: [] as CircumstanceViewModel[],
  noneOfTheseCircumstances: false,
};

type PersonalCircumstancesComponentProps = ComponentProps & RouteComponentProps;

type PersonalCircumstancesComponentState = Readonly<typeof initialState>;

export class PersonalCircumstancesComponent extends React.Component<
  PersonalCircumstancesComponentProps,
  PersonalCircumstancesComponentState
> {
  readonly state: PersonalCircumstancesComponentState = initialState;

  componentWillMount(): void {
    const { circumstances, circumstancesForMember } = this.props;
    const newState = { ...this.state };
    newState.circumstancesViewModels = this.getCircumstancesViewModels(circumstances, circumstancesForMember);
    this.setState(newState);
  }

  componentWillReceiveProps(newProps: PersonalCircumstancesComponentProps): void {
    const { circumstances, circumstancesForMember } = newProps;
    const newState = { ...this.state };
    newState.circumstancesViewModels = this.getCircumstancesViewModels(circumstances, circumstancesForMember);
    this.setState(newState);
  }

  private getCircumstancesViewModels = (
    allCircumstanceOptions: CircumstanceModel[],
    circumstancesForMember: CircumstanceModel[],
  ): CircumstanceViewModel[] => {
    return allCircumstanceOptions.map(model => ({
      id: model.id,
      name: model.name,
      vulnerable: model.vulnerable,
      isChecked: this.circumstanceExistsForMember(model, circumstancesForMember),
    }));
  };

  private circumstanceExistsForMember = (
    sourceModel: CircumstanceModel,
    circumstancesForMember: CircumstanceModel[],
  ): boolean => {
    return circumstancesForMember.some(cForMember => cForMember.id === sourceModel.id);
  };

  toggleShowWhyWeAskYouThis = (): void => {
    onboardingAnalyticsService.accessAndEstablishWhyWeAskYouThisLink();
    const newState = { ...this.state };
    newState.showWhyWeAskYouThis = !newState.showWhyWeAskYouThis;
    this.setState(newState);
  };

  onCicumstanceCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { id } = event.target;
    id === 'none-of-these' ? this.handleNoneCheckboxChange(id) : this.handleCircumstanceCheckboxChange(id);
  };

  private handleNoneCheckboxChange = (checkboxId: string): void => {
    const newState = { ...this.state };
    if (!newState.noneOfTheseCircumstances) {
      onboardingAnalyticsService.accessAndEstablishVulnerabilitiesSelected([checkboxId]);
    }
    newState.circumstancesViewModels.map(vm => (vm.isChecked = false));
    newState.noneOfTheseCircumstances = !newState.noneOfTheseCircumstances;
    this.setState(newState, () => this.props.onNoneOfTheseSelected());
  };

  private handleCircumstanceCheckboxChange = (checkboxId: string): void => {
    const newState = { ...this.state };
    newState.noneOfTheseCircumstances = false;
    const match = newState.circumstancesViewModels.find(vm => vm.id.toString() === checkboxId);
    match.isChecked = !match.isChecked;
    this.setState(newState);
  };

  onCircumstancesConfirmed = (): void => {
    const { circumstancesViewModels } = this.state;
    const { circumstances } = this.props;

    const selections = circumstancesViewModels
      .filter(vm => vm.isChecked)
      .map(result => ({ id: result.id, name: result.name, vulnerable: result.vulnerable }));
    const models = circumstances.filter(c => selections.some(s => s.id === c.id));

    this.props.onCircumstancesConfirmed(models);
  };

  onSkipCircumstances = (): void => {
    onboardingAnalyticsService.accessAndEstablishSkipPersonalCircumstances();
  };

  render(): React.ReactNode {
    const { circumstancesViewModels, noneOfTheseCircumstances, showWhyWeAskYouThis } = this.state;

    return (
      <div className="l-container">
        <PageHeader
          type="main"
          text={`${
            this.props.firstName
          }, help us understand if any of these are currently affecting your household finances`}
        />

        <main className="u-align-center">
          <p className="u-mb-m"> (Choose as many as you need to) </p>

          <ul className={styles.cloud}>
            {circumstancesViewModels.map(c => (
              <li key={c.name}>
                <CheckboxButton
                  label={c.name}
                  name={c.name}
                  id={c.id.toString()}
                  value={c.name}
                  checked={c.isChecked}
                  onChange={this.onCicumstanceCheckboxChange}
                />
              </li>
            ))}
            <li>
              <CheckboxButton
                label="None of these"
                name="none-of-these"
                id="none-of-these"
                value="none-of-these"
                checked={noneOfTheseCircumstances}
                onChange={this.onCicumstanceCheckboxChange}
              />
            </li>
          </ul>

          <div className={styles.tooltip}>
            <button type="button" className="u-link u-bold" onClick={this.toggleShowWhyWeAskYouThis}>
              Why we ask you about this
            </button>

            {showWhyWeAskYouThis && (
              <Alert id="how-we-make-money" arrow="center" handleClose={this.toggleShowWhyWeAskYouThis}>
                <p>
                  Understanding your circumstances means we stand a better chance of finding an outcome that suits you.
                </p>
                <p>We will not share this information with anyone else unless you say that's ok.</p>
              </Alert>
            )}
          </div>

          <div className="u-bg-path path-2 u-mb-s">
            <Button type="button" primary main onClick={this.onCircumstancesConfirmed}>
              That's everything
            </Button>
          </div>

          <TextLink
            to={OnboardingRoutes.OpenBankingIntro}
            text="Skip and we won't keep a record of this information"
            onClick={this.onSkipCircumstances}
          />
        </main>
      </div>
    );
  }
}
