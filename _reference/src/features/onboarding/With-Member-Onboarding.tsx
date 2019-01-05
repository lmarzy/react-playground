import * as React from 'react';
import WithLoading from '../../shared/render-functions/with-loading';
import { MemberAccessTokenKey, MemberRefreshTokenKey } from '../member/constants';
import { tokenParser } from '../../shared/auth/token-parser';
import { memberApi } from '../member/member-api';
import { onboardingApi } from './onboarding.api';
import { OnboardingStateModel } from './onboarding-state.model';
import { OnBoardingContainerProps } from './OnBoarding.container';
import { RouteComponentProps } from 'react-router';
import { LoginRoutes } from '../login/login.routes';

interface WithMemberOnboardingProps {
  children: (props: OnBoardingContainerProps) => JSX.Element;
  onError: () => void;
}

const initialState = {
  onboardingStateModel: null as OnboardingStateModel,
};

type WithMemberOnboardingComponentState = Readonly<typeof initialState>;

export class WithMemberOnboardingComponent extends React.Component<
  WithMemberOnboardingProps & RouteComponentProps,
  WithMemberOnboardingComponentState
> {
  readonly state: WithMemberOnboardingComponentState = initialState;

  componentWillMount(): void {
    const accessToken = localStorage.getItem(MemberAccessTokenKey);

    if (accessToken === null) {
      this.props.history.push(LoginRoutes.Login);
    } else {
      this.tryToRecreatMemberState(accessToken);
    }
  }

  private tryToRecreatMemberState = (accessToken: string): void => {
    const parsedAccessToken = tokenParser.parse(accessToken);
    const currentTime = new Date().getTime() / 1000;

    if (currentTime > parsedAccessToken.exp /* Add 5 seconds to account for race conditions? */) {
      // console.log('token expired -> login'); // TODO add in redirect to login page when built
      memberApi.aquireNewTokens().then(res => this.saveTokensToLocalStorage(res.data, this.restoreMemberState));
    } else {
      this.restoreMemberState();
    }
  };

  private saveTokensToLocalStorage = (responseData: any, onMemberTokensSavedSuccess: () => void): void => {
    localStorage.setItem(MemberAccessTokenKey, responseData.access_token);
    localStorage.setItem(MemberRefreshTokenKey, responseData.refresh_token);
    onMemberTokensSavedSuccess();
  };

  private restoreMemberState = (): void => {
    onboardingApi.getOnboardingStateForMember().then(result => this.setState({ onboardingStateModel: result.data }));
  };

  private showLoadingIndicator = (): boolean => {
    return this.state.onboardingStateModel === null;
  };

  render(): JSX.Element {
    return (
      <WithLoading
        children={this.props.children({
          onboardingStateModel: this.state.onboardingStateModel,
        })}
        showLoadingIndicator={() => this.showLoadingIndicator()}
      />
    );
  }
}

export default WithMemberOnboardingComponent;
