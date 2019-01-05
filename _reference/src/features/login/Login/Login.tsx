import * as React from 'react';
import { InputPassword, PageHeader, Button, InputEmail, Alert } from '../../../shared/components';
import validate from '../../../utils/validation';
import { loginApi } from '../login.api';
import { AxiosResponse } from 'axios';
import { MemberAccessTokenKey, MemberRefreshTokenKey } from '../../member/constants';
import { withRouter, RouteComponentProps } from 'react-router';
import { OnboardingRoutes } from '../../onboarding';
import { tokenParser } from '../../../shared/auth/token-parser';
import { MemberOnboardingIdKey } from '../../onboarding/constants';
import { analyticsEventService } from '../../../shared/analytics';
import * as analytics from './Login.analytics.events';

interface LoginInput {
  value: string;
  valid: boolean;
  touched: boolean;
}

export const initialState = {
  inputs: {
    email: {
      value: '',
      valid: true,
    } as LoginInput,
    password: {
      value: '',
      valid: true,
    } as LoginInput,
  } as { [key: string]: LoginInput },
  loginDetailsNotRecognised: false,
};

export type LoginComponentState = Readonly<typeof initialState>;

export const onInputChange = (inputId: string, value: string, prevState: LoginComponentState): LoginComponentState => {
  const newState = { ...prevState };
  newState.inputs[inputId].value = value;
  newState.inputs[inputId].valid = true;
  newState.loginDetailsNotRecognised = false;
  return newState;
};

export const onLoginFailure = (prevState: LoginComponentState): LoginComponentState => {
  const newState = { ...prevState };
  newState.loginDetailsNotRecognised = true;
  return newState;
};

export class LoginComponent extends React.Component<RouteComponentProps, LoginComponentState> {
  readonly state: LoginComponentState = initialState;

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void =>
    this.setState(onInputChange(event.target.id, event.target.value, this.state));

  handleLogin = (event: React.FormEvent<HTMLInputElement>): void => {
    event.preventDefault();

    analyticsEventService.raiseEvent(analytics.Login);

    const { email } = this.state.inputs;
    const newState = { ...this.state };

    const emailValid = validate('email', email.value);

    if (emailValid) {
      loginApi
        .loginUser(newState.inputs.email.value, newState.inputs.password.value)
        .then(this.handleLoginSuccess, this.handleLoginFailure);
    } else {
      newState.inputs.email.valid = false;
      this.setState(newState);
    }
  };

  handleLoginSuccess = (res: AxiosResponse<LoginComponentState>): void => {
    const responseData = res.data as any;
    const parsedAccessToken = tokenParser.parse(responseData.access_token);
    this.saveMemberData(res.data, parsedAccessToken);
    this.props.history.push(OnboardingRoutes.Home);
  };

  handleLoginFailure = (): void => this.setState(onLoginFailure(this.state));

  private saveMemberData = (responseData: any, token: any): void => {
    localStorage.setItem(MemberAccessTokenKey, responseData.access_token);
    localStorage.setItem(MemberRefreshTokenKey, responseData.refresh_token);
    localStorage.setItem(MemberOnboardingIdKey, token.member_onboarding_id);
  };

  render() {
    const { inputs, loginDetailsNotRecognised } = this.state;

    const enableLoginBtn =
      inputs.email.value.length > 0 && inputs.password.value.length > 0 && !loginDetailsNotRecognised;

    return (
      <React.Fragment>
        <div className="l-container">
          <PageHeader type="alt" text="Welcome Back!" icon="login" />
          <main>
            <form noValidate>
              <fieldset>
                <legend className="u-hidden-visually">Login</legend>
                <div className="u-mb-m">
                  <div className="u-mb-t">
                    <InputEmail
                      value={inputs.email.value}
                      valid={inputs.email.valid}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>

                <div className="u-mb-m">
                  <InputPassword
                    value={inputs.password.value}
                    valid={inputs.password.valid}
                    touched={inputs.password.touched}
                    onChange={this.handleInputChange}
                  />
                </div>

                {loginDetailsNotRecognised && (
                  <div className="u-mb-s">
                    <Alert error id="loginDetailsNotRecognised">
                      <p className="u-mb-s">We don't recognise these login details.</p>
                      <p>If you're having difficulties, try 'I forgot' below to reset your password.</p>
                    </Alert>
                  </div>
                )}

                {/* <div className="u-align-center u-mb-l">
                  <TextLink to="/forgot-password" text="I forgot" />
                </div> */}

                <div className="u-bg-path path-1 u-mb3">
                  <Button type="submit" primary main disabled={!enableLoginBtn} onClick={this.handleLogin}>
                    Login
                  </Button>
                </div>
              </fieldset>
            </form>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(LoginComponent);
