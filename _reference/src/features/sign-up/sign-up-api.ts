import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { SignUpUserStateModel } from './models';
import { signUpFeatureBaseUri, SignUpTokenKey } from './shared';
import { CompleteSignUpRequestModel } from './Security-Agreements/models/complete-sign-up-request.model';

class SignUpApi {
  private getDefaultConfig = (): AxiosRequestConfig => ({
    baseURL: process.env.CORE_API_BASE_URL,
    headers: {
      Accept: 'application/json',
    },
  });

  private getSignUpApiConfig = (): AxiosRequestConfig => ({
    baseURL: process.env.CORE_API_BASE_URL,
    headers: {
      Accept: 'application/json',
      Authorization: localStorage.getItem(SignUpTokenKey),
    },
  });

  startSignUp = (prospectToken: string): AxiosPromise<SignUpUserStateModel> => {
    return axios.create(this.getDefaultConfig()).post<SignUpUserStateModel>('/signups/start', { token: prospectToken });
  };

  getSignUpStateForUser = (signupId: string): AxiosPromise<SignUpUserStateModel> => {
    return axios.create(this.getSignUpApiConfig()).get(`${signUpFeatureBaseUri(signupId)}`);
  };

  endJourney = (signupId: string): AxiosPromise => {
    return axios.create(this.getSignUpApiConfig()).post(`${signUpFeatureBaseUri(signupId)}/cancel`);
  };

  completeSignUpJourney = (signupId: string, requestModel: CompleteSignUpRequestModel): AxiosPromise => {
    const { contactPreferences, dateOfBirth, email, password, termsAccepted } = requestModel;
    const postData = {
      termsAccepted,
      dateOfBirth,
      user: { email, password },
      contactPreferences: {
        email: contactPreferences.emailAddress,
        telephoneNumber: contactPreferences.telephoneNumber,
        optInToMarketing: contactPreferences.optInToMarketing,
      },
    };

    return axios.create(this.getSignUpApiConfig()).post(`${signUpFeatureBaseUri(signupId)}/complete`, postData);
  };
}

export const signUpApi = new SignUpApi();
