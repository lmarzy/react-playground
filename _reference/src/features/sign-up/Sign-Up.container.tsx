import * as React from 'react';
import { AxiosResponse } from 'axios';
import { withRouter, RouteComponentProps, Switch, Route } from 'react-router';

import { SignUpUserStateModel } from './models';
import HomeComponent from './Home/Home.component';
import SecurityAgreementsContainer from './Security-Agreements/Security-Agreements.container';
import { MemberOnboardingIdKey } from '../onboarding/constants';
import { OnboardingRoutes } from '../onboarding';

import { IdentityErrorComponent } from './error-handling/Identity-Error/Identity-Error.component';

import { signUpApi } from './sign-up-api';
import { SignUpRoutes } from './sign-up.routes';
import { SignUpErrors } from './sign-up.errors';
import { ErrorHandlingRoutes } from '../error-handling';
import { memberApi } from '../member/member-api';
import { MemberAccessTokenKey, MemberRefreshTokenKey } from '../member/constants';
import { signUpAnalyticsService } from './sign-up-analytics.service';

export interface SignUpContainerProps {
  signUpUserStateModel: SignUpUserStateModel;
  onError: () => void;
}

export class SignUpContainer extends React.Component<SignUpContainerProps & RouteComponentProps> {
  state = {
    howWeMakeMoneyActive: false,
    signUpUserStateModel: { ...this.props.signUpUserStateModel } as SignUpUserStateModel,
  };

  readonly errorHandles: Map<number, () => void> = new Map([
    [SignUpErrors.SIGNUP_COMPLETE_SIGNUP_NOTFOUND, () => this.props.history.push(ErrorHandlingRoutes.NotFound)],
    [SignUpErrors.SIGNUP_COMPLETE_SIGNUP_CANCELLED, () => this.props.history.push(ErrorHandlingRoutes.AppError)],
    [SignUpErrors.SIGNUP_COMPLETE_SIGNUP_COMPLETED, () => this.props.history.push(ErrorHandlingRoutes.NotFound)],
  ]);

  handleToggleHowDoWeMakeMoney = (): void => {
    const newState = { ...this.state };
    newState.howWeMakeMoneyActive = !newState.howWeMakeMoneyActive;
    this.setState(newState);
  };

  handleJourneyEnd = (): void => {
    signUpAnalyticsService.identityDateOfBirthFailedGoToReferrer();
    signUpApi.endJourney(this.state.signUpUserStateModel.id).then(this.journeyEndSuccess, this.props.onError);
  };

  private journeyEndSuccess = (): void => {
    window.location.href = this.state.signUpUserStateModel.prospect.referrer.redirectUri;
  };

  handleDeclineTermsAndConditions = (): void => {
    signUpAnalyticsService.termsAndConditionsDeclinedGoToReferrer();
    signUpApi.endJourney(this.state.signUpUserStateModel.id).then(this.journeyEndSuccess, this.props.onError);
  };

  private completeSignUpJourneyFailure = (errorCode: number): void => {
    const errorHandler = this.errorHandles.get(errorCode);
    errorHandler();
  };

  handleCompleteSignUpJourneySuccess = (response: AxiosResponse, memberEmail: string, memberPassword: string): void => {
    memberApi.createMember(memberEmail, memberPassword).then(res => {
      localStorage.setItem(MemberOnboardingIdKey, response.data.memberOnboardingId);
      this.saveTokens(res.data);
      this.props.history.push(OnboardingRoutes.Home);
    });
  };

  private saveTokens = (responseData: any): void => {
    localStorage.setItem(MemberAccessTokenKey, responseData.access_token);
    localStorage.setItem(MemberRefreshTokenKey, responseData.refresh_token);
  };

  render(): JSX.Element {
    const { howWeMakeMoneyActive, signUpUserStateModel } = this.state;
    return (
      <Switch>
        <Route
          exact
          path={SignUpRoutes.Home}
          render={() => (
            <HomeComponent
              howWeMakeMoneyActive={howWeMakeMoneyActive}
              onContinue={() => this.props.history.push(SignUpRoutes.Agreements)}
              onToggleHowDoWeMakeMoney={this.handleToggleHowDoWeMakeMoney}
              userFirstName={signUpUserStateModel.prospect.firstName}
            />
          )}
        />
        <Route
          path={SignUpRoutes.Agreements}
          render={() => (
            <SecurityAgreementsContainer
              onDeclineTermsAndConditions={this.handleDeclineTermsAndConditions}
              onCompleteSignUpError={this.completeSignUpJourneyFailure}
              onCompleteSignUpSuccess={this.handleCompleteSignUpJourneySuccess}
              accountCreated={signUpUserStateModel.accountCreated}
              contactChoicesConfirmed={signUpUserStateModel.contactChoicesConfirmed}
              contactPreferences={signUpUserStateModel.contactPreferences}
              identityChecked={signUpUserStateModel.identityChecked}
              prospect={signUpUserStateModel.prospect}
              termsAndConditionsAccepted={signUpUserStateModel.termsAndConditionsAccepted}
              userEmail={signUpUserStateModel.identity.emailAddress}
              signUpId={signUpUserStateModel.id}
            />
          )}
        />
        <Route
          path={SignUpRoutes.IdentityError}
          render={() => (
            <IdentityErrorComponent
              referrerName={signUpUserStateModel.prospect.referrer.name}
              onJourneyEnd={this.handleJourneyEnd}
            />
          )}
        />
      </Switch>
    );
  }
}

export default withRouter(SignUpContainer);
