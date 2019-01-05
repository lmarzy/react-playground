import * as React from 'react';

import { withRouter, RouteComponentProps, Switch, Route } from 'react-router';

import { OnboardingRoutes } from './onboarding.routes';

import { OnboardingStateModel, OnboardingCheckpoint } from './onboarding-state.model';
import HomeComponent from './Home/Home.component';

import { LivesWithComponent } from './Lives-With/Lives-With';
import { PersonalCircumstancesComponent } from './Personal-Circumstance/Personal-Circumstance';
import StepsComponent from './Steps/Steps.component';
import { CircumstanceModel } from './Personal-Circumstance/circumstance.model';
import { HowWillThisAffectYouComponent } from './Personal-Circumstance/How-Will-This-Affect-You';
import { onboardingApi } from './onboarding.api';
import { OpenBankingIntro } from './Open-Banking-Intro/Open-Banking-Intro';
import { LivesWithModel } from './Lives-With/lives-with.model';
import { OpenBankingTransferringYou } from './Open-Banking-Transferring-You/Open-Banking-Transferring-you';
import { CheckPointToRoutesMap } from '../checkpoints-to-routes-map';
import BudgetContainer from './Budget/Budget.container';

export interface OnBoardingContainerProps {
  onboardingStateModel: OnboardingStateModel;
}

export class OnBoardingContainer extends React.Component<RouteComponentProps & OnBoardingContainerProps> {
  state = {
    redirectForExistingUser: false,
    currentCheckpoint: 'Start' as OnboardingCheckpoint,
    livesWithData: {
      children: 0,
      dependentAdults: 0,
      otherAdults: 0,
      partner: false,
      youngAdults: 0,
    } as LivesWithModel,
    circumstances: {
      circumstanceOptions: [] as CircumstanceModel[],
      circumstancesForMember: [] as CircumstanceModel[],
    },
  };

  async componentWillMount(): Promise<void> {
    const { checkpoint } = this.props.onboardingStateModel;
    const newState = { ...this.state };

    const allCircumstanceOptionsResponse = await onboardingApi.getAllCircumstanceOptions();
    const allCircumstanceOptionsData = await allCircumstanceOptionsResponse.data;

    newState.circumstances.circumstanceOptions = allCircumstanceOptionsData;

    if (checkpoint !== this.state.currentCheckpoint) {
      newState.currentCheckpoint = checkpoint;

      this.props.history.push(CheckPointToRoutesMap.get(checkpoint));

      const livesWithResponse = await onboardingApi.getLivesWith();
      const livesWithData = livesWithResponse.data;
      newState.livesWithData = livesWithData;

      const circumstancesForMemberResponse = await onboardingApi.getCircumstancesForMember();
      const circumstancesForMemberData = await circumstancesForMemberResponse.data;
      newState.circumstances.circumstancesForMember = await allCircumstanceOptionsData.filter(c =>
        circumstancesForMemberData.ids.find((id: number) => id === c.id),
      );
    }

    newState.redirectForExistingUser = true;

    this.setState(newState);
  }

  handlePersonalCircumstancesConfirmed = (models: CircumstanceModel[]): void => {
    const { history } = this.props;
    const newState = { ...this.state };

    if (models.length > 0) {
      newState.circumstances.circumstancesForMember = models;
      const anyNonVulnerableCirumstances = newState.circumstances.circumstancesForMember.some(c => !c.vulnerable);
      this.setState(newState, () =>
        anyNonVulnerableCirumstances
          ? history.push(OnboardingRoutes.PersonalCircumstanceAffecting)
          : this.submitVulnerableCircumstances(models),
      );
    } else {
      this.skipPersonalCircumstances();
    }
  };

  skipPersonalCircumstances = async (): Promise<void> => {
    await onboardingApi.skipPersonalCircumstances();
    this.props.history.push(OnboardingRoutes.OpenBankingIntro);
  };

  submitVulnerableCircumstances = async (models: CircumstanceModel[]): Promise<void> => {
    const { history } = this.props;

    const vunerableModelIds = models.filter(m => m.vulnerable).map(m => m.id);
    const anyModelsAreNonVulnerable = false;

    await onboardingApi.setPersonalCircumstances(vunerableModelIds, anyModelsAreNonVulnerable);

    history.push(OnboardingRoutes.OpenBankingIntro);
  };

  handleLivesWithSubmit = async (livesWithData: LivesWithModel): Promise<void> => {
    await onboardingApi.setLivesWith(livesWithData);

    const newState = { ...this.state };
    newState.currentCheckpoint = 'LivesWith';
    newState.livesWithData = livesWithData;

    this.setState(newState, () => this.props.history.push(OnboardingRoutes.PersonalCircumstance));
  };

  handleHowThisWillAffectYouSubmit = async (nonVulnerableCircumstancesWillAffectLongTerm: boolean): Promise<void> => {
    const circumstancesIds = this.state.circumstances.circumstancesForMember.map(c => c.id);
    await onboardingApi.setPersonalCircumstances(circumstancesIds, nonVulnerableCircumstancesWillAffectLongTerm);

    const newState = { ...this.state };
    newState.currentCheckpoint = 'Circumstances';

    this.setState(newState, () => this.props.history.push(OnboardingRoutes.OpenBankingIntro));
  };

  handleNoneOfTheseSelected = (): void => {
    const newState = { ...this.state };
    newState.circumstances.circumstancesForMember = [];
    this.setState(newState);
  };

  render(): JSX.Element {
    const { livesWithData, redirectForExistingUser } = this.state;
    const { circumstanceOptions, circumstancesForMember } = this.state.circumstances;
    const { firstName } = this.props.onboardingStateModel.member;

    return redirectForExistingUser ? (
      <Switch>
        <Route exact path={OnboardingRoutes.Home} render={() => <HomeComponent />} />
        <Route path={OnboardingRoutes.Steps} render={() => <StepsComponent />} />
        <Route
          path={OnboardingRoutes.LivesWith}
          render={() => <LivesWithComponent livesWithData={livesWithData} onSubmit={this.handleLivesWithSubmit} />}
        />
        <Route
          exact
          path={OnboardingRoutes.PersonalCircumstance}
          render={() => (
            <PersonalCircumstancesComponent
              circumstances={circumstanceOptions}
              circumstancesForMember={circumstancesForMember}
              firstName={firstName}
              onCircumstancesConfirmed={this.handlePersonalCircumstancesConfirmed}
              onNoneOfTheseSelected={this.handleNoneOfTheseSelected}
              {...this.props}
            />
          )}
        />
        <Route
          exact
          path={OnboardingRoutes.PersonalCircumstanceAffecting}
          render={() => (
            <HowWillThisAffectYouComponent
              circumstances={circumstancesForMember.filter(c => !c.vulnerable).map(c => c.name)}
              howThisWillAffectYouSubmit={this.handleHowThisWillAffectYouSubmit}
            />
          )}
        />
        <Route
          exact
          path={OnboardingRoutes.OpenBankingIntro}
          render={() => <OpenBankingIntro partner={livesWithData.partner} {...this.props} />}
        />
        <Route
          path={OnboardingRoutes.OpenBankingTransferringYou}
          render={() => <OpenBankingTransferringYou firstName={firstName} />}
        />
        <Route path={OnboardingRoutes.Budget} render={() => <BudgetContainer />} />
      </Switch>
    ) : null;
  }
}

export default withRouter(OnBoardingContainer);
