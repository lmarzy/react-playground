import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { OnboardingStateModel } from './onboarding-state.model';
import { MemberOnboardingIdKey } from './constants';
import { MemberAccessTokenKey } from '../member/constants';
import { CircumstanceModel } from './Personal-Circumstance/circumstance.model';
import { LivesWithModel } from './Lives-With/lives-with.model';

class OnboardingApi {
  private getOnboardingApiConfig = (): AxiosRequestConfig => ({
    baseURL: process.env.CORE_API_BASE_URL,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem(MemberAccessTokenKey)}`,
    },
  });

  getOnboardingStateForMember = (): AxiosPromise<OnboardingStateModel> => {
    const memberId = localStorage.getItem(MemberOnboardingIdKey);
    return axios.create(this.getOnboardingApiConfig()).get<OnboardingStateModel>(`members/${memberId}/onboarding`);
  };

  getLivesWith = (): AxiosPromise<LivesWithModel> => {
    const memberId = localStorage.getItem(MemberOnboardingIdKey);
    return axios.create(this.getOnboardingApiConfig()).get<LivesWithModel>(`members/${memberId}/onboarding/lives-with`);
  };

  setLivesWith = (livesWithData: LivesWithModel): AxiosPromise => {
    const memberId = localStorage.getItem(MemberOnboardingIdKey);
    const { children, dependentAdults, otherAdults, partner, youngAdults } = livesWithData;
    const self = !partner && children === 0 && youngAdults === 0 && dependentAdults === 0 && otherAdults === 0;
    const requestData = self ? { self: true } : { others: livesWithData, self: false };
    return axios.create(this.getOnboardingApiConfig()).put(`members/${memberId}/onboarding/lives-with`, requestData);
  };

  getAllCircumstanceOptions = (): AxiosPromise<CircumstanceModel[]> => {
    return axios.create(this.getOnboardingApiConfig()).get<CircumstanceModel[]>(`members/onboarding/circumstances`);
  };

  getCircumstancesForMember = (): AxiosPromise => {
    const memberId = localStorage.getItem(MemberOnboardingIdKey);
    return axios.create(this.getOnboardingApiConfig()).get(`members/${memberId}/onboarding/circumstances`);
  };

  skipPersonalCircumstances = (): AxiosPromise<any> => {
    const memberId = localStorage.getItem(MemberOnboardingIdKey);
    return axios.create(this.getOnboardingApiConfig()).put(`members/${memberId}/onboarding/circumstances`, { ids: [] });
  };

  setPersonalCircumstances = (
    circumstanceIds: number[],
    nonVulnerableCircumstancesWillAffectLongTerm: boolean,
  ): AxiosPromise<any> => {
    const memberId = localStorage.getItem(MemberOnboardingIdKey);
    const requestData = nonVulnerableCircumstancesWillAffectLongTerm
      ? { nonVulnerableCircumstancesWillAffectLongTerm, ids: circumstanceIds }
      : { ids: circumstanceIds };
    return axios.create(this.getOnboardingApiConfig()).put(`members/${memberId}/onboarding/circumstances`, requestData);
  };
}

export const onboardingApi = new OnboardingApi();
