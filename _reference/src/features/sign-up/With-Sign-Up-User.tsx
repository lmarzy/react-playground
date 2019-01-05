import * as React from 'react';
import { AxiosResponse } from 'axios';

import { SignUpUserStateModel, ContactPreferencesModel } from './models';
import { SignUpTokenKey } from './shared';
import { SignUpContainerProps } from './Sign-Up.container';

import WithLoading from '../../shared/render-functions/with-loading';

import { signUpApi } from './sign-up-api';
import { signUpQueryStringParser } from './sign-up-query-string-parser';

import { tokenParser } from '../../shared/auth/token-parser';

export interface WithSignUpUserProps {
  children: (props: SignUpContainerProps) => React.ReactNode;
  onError: () => void;
}

const initialState = {
  signUpUserStateModel: null as SignUpUserStateModel,
};

type WithSignUpUserComponentState = Readonly<typeof initialState>;

export class WithSignUpUserComponent extends React.Component<WithSignUpUserProps, WithSignUpUserComponentState> {
  readonly state: WithSignUpUserComponentState = initialState;

  componentWillMount(): void {
    const tokenQueryStringValues = signUpQueryStringParser.getQueryStringValue(window.location.search);
    this.buildUserState(tokenQueryStringValues.token);
  }

  private buildUserState = (token: string): void => {
    token === null
      ? this.tryToRecreateSignUpUser()
      : signUpApi.startSignUp(token).then(this.onStartSignUpJourneySuccess, this.props.onError);
  };

  private onStartSignUpJourneySuccess = (res: AxiosResponse<SignUpUserStateModel>): void => {
    this.mapNewUser(res.data);
    const signUpToken = res.headers.authorization;
    localStorage.setItem(SignUpTokenKey, signUpToken);
  };

  private mapNewUser = (model: SignUpUserStateModel): void => {
    const signUpStateModel = {
      id: model.id,
      prospect: { ...model.prospect },
      contactPreferences: {
        optInToMarketing: false,
        emailAddress: null,
        telephoneNumber: null,
      },
      accountCreated: false,
      contactChoicesConfirmed: false,
      identityChecked: false,
      termsAndConditionsAccepted: false,
      identity: {
        emailAddress: model.prospect.email ? model.prospect.email : null,
      },
    } as SignUpUserStateModel;

    this.setSignUpUserStateModel(signUpStateModel);
  };

  private tryToRecreateSignUpUser = (): void => {
    const signUpToken = localStorage.getItem(SignUpTokenKey);

    if (signUpToken === null) {
      this.props.onError();
    }

    const parsedSignUpToken = tokenParser.parse(signUpToken);
    const currentTime = new Date().getTime() / 1000;

    if (currentTime > parsedSignUpToken.exp) {
      this.props.onError();
    }

    signUpToken !== null
      ? signUpApi
          .getSignUpStateForUser(parsedSignUpToken.signup_id)
          .then(this.getExistingUserSuccess, this.props.onError)
      : this.props.onError();
  };

  private getExistingUserSuccess = (res: AxiosResponse<SignUpUserStateModel>): void => {
    this.mapExistingUser(res.data);
  };

  private mapExistingUser = (model: SignUpUserStateModel): void => {
    const contactPreferences = {
      optInToMarketing: model.contactPreferences ? model.contactPreferences.optInToMarketing : false,
      emailAddress: model.contactPreferences ? model.contactPreferences.emailAddress : null,
      telephoneNumber: model.contactPreferences ? model.contactPreferences.telephoneNumber : null,
    } as ContactPreferencesModel;

    const signUpStateModel = {
      contactPreferences,
      prospect: { ...model.prospect },
      termsAndConditionsAccepted: model.termsAndConditionsAccepted,
      id: model.id,
      accountCreated: model.identityChecked, // if id check has passed they must have an account
      contactChoicesConfirmed: model.contactPreferences ? true : false,
      identityChecked: model.identityChecked,
      identity: model.identity,
    } as SignUpUserStateModel;

    this.setSignUpUserStateModel(signUpStateModel);
  };

  private setSignUpUserStateModel = (signUpStateModel: SignUpUserStateModel): void => {
    const newState = { ...this.state };
    newState.signUpUserStateModel = signUpStateModel;
    this.setState(newState);
  };

  private showLoadingIndicator = (): boolean => {
    return this.state.signUpUserStateModel === null;
  };

  render(): JSX.Element {
    return (
      <WithLoading
        children={this.props.children({
          onError: this.props.onError,
          signUpUserStateModel: this.state.signUpUserStateModel,
        })}
        showLoadingIndicator={this.showLoadingIndicator}
      />
    );
  }
}

export default WithSignUpUserComponent;
