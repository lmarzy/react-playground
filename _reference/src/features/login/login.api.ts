import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

class LoginApi {
  readonly baseUrl: string = 'http://core.auth.tully.local/';
  readonly clientId: string = 'tully.core.api';

  private getDefaultConfig = (): AxiosRequestConfig => ({
    baseURL: this.baseUrl,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  private getLoginUserSearchParams = (email: string, password: string): URLSearchParams => {
    const params = new URLSearchParams();
    params.append('client_id', this.clientId);
    params.append('grant_type', 'password');
    params.append('username', email);
    params.append('password', password);
    return params;
  };

  loginUser = (email: string, password: string): AxiosPromise => {
    const params = this.getLoginUserSearchParams(email, password);
    return axios.create(this.getDefaultConfig()).post(`${this.baseUrl}/connect/token`, params);
  };
}

export const loginApi = new LoginApi();
