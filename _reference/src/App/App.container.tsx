import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps, Switch, Route } from 'react-router';

import '../styles/app.scss';

import { SignUpContainerProps } from '../features/sign-up/Sign-Up.container';
import { OnBoardingContainerProps } from '../features/onboarding/OnBoarding.container';
import { NotFoundComponent } from '../features/error-handling/Not-Found/Not-Found.component';

import { SignUpRoutes } from '../features/sign-up/sign-up.routes';
import { OnboardingRoutes } from '../features/onboarding';
import { Loading } from '../shared/components';
import { Login } from '../features/login/Login/Login.analytics.events';
import { LoginRoutes } from '../features/login/login.routes';
import { LoginComponent } from '../features/login/Login/Login';

const AsyncWithSignUpComponent = React.lazy(() => import('../features/sign-up/With-Sign-Up-User'));
const AsyncSignUpContainer = React.lazy(() => import('../features/sign-up/Sign-Up.container'));

const AsyncWithMemberOnBoarding = React.lazy(() => import('../features/onboarding/With-Member-Onboarding'));
const AsyncOnBoardingContainer = React.lazy(() => import('../features/onboarding/OnBoarding.container'));

export class AppContainer extends React.Component<RouteComponentProps> {
  state = {
    applicationErrored: false,
  };

  private handleApplicationHasErrored = (): void => {
    const newState = { ...this.state };
    newState.applicationErrored = true;
    this.setState(newState, () => this.props.history.push('/not-found'));
  };

  render(): JSX.Element {
    return (
      <React.Fragment>
        {!this.state.applicationErrored && (
          <Switch>
            <Route
              path={SignUpRoutes.Home}
              render={routingProps => (
                <React.Suspense fallback={<Loading />}>
                  <AsyncWithSignUpComponent
                    children={(renderProps: SignUpContainerProps) => (
                      <AsyncSignUpContainer
                        signUpUserStateModel={renderProps.signUpUserStateModel}
                        onError={renderProps.onError}
                        {...routingProps}
                      />
                    )}
                    onError={this.handleApplicationHasErrored}
                  />
                </React.Suspense>
              )}
            />
            <Route
              path={OnboardingRoutes.Home}
              render={routingProps => (
                <React.Suspense fallback={<Loading />}>
                  <AsyncWithMemberOnBoarding
                    children={(renderProps: OnBoardingContainerProps) => (
                      <AsyncOnBoardingContainer
                        onboardingStateModel={renderProps.onboardingStateModel}
                        {...routingProps}
                      />
                    )}
                    onError={this.handleApplicationHasErrored}
                    {...routingProps}
                  />
                </React.Suspense>
              )}
            />
            <Route path={LoginRoutes.Login} render={routingProps => <LoginComponent {...routingProps} />} />
            <Route path="/not-found" render={() => <NotFoundComponent />} />
          </Switch>
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(AppContainer);
