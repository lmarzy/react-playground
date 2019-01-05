import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { MemberRefreshTokenKey } from './constants';

class MemberApi {
  readonly baseUrl: string = process.env.CORE_AUTH_BASE_URL;
  readonly clientId: string = 'tully.core.api';

  private getDefaultConfig = (): AxiosRequestConfig => ({
    baseURL: process.env.CORE_API_BASE_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  private getCreateMemberSearchParams = (email: string, password: string): URLSearchParams => {
    const params = new URLSearchParams();
    params.append('client_id', this.clientId);
    params.append('grant_type', 'password');
    params.append('username', email);
    params.append('password', password);
    return params;
  };

  createMember = (email: string, password: string): AxiosPromise => {
    const params = this.getCreateMemberSearchParams(email, password);
    return axios.create(this.getDefaultConfig()).post(`${this.baseUrl}/connect/token`, params);
  };

  private getRefreshTokenSearchParams = (): URLSearchParams => {
    const params = new URLSearchParams();
    params.append('client_id', this.clientId);
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', localStorage.getItem(MemberRefreshTokenKey));
    return params;
  };

  aquireNewTokens = (): AxiosPromise => {
    const params = this.getRefreshTokenSearchParams();
    return axios.create(this.getDefaultConfig()).post(`${this.baseUrl}/connect/token`, params);
  };
}

export const memberApi = new MemberApi();
