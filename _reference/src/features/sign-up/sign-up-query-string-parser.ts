export interface SignUpQueryStringValues {
  token: string;
}

export class SignUpQueryStringParser {
  readonly tokenIdentifier: string = 'token';

  getQueryStringValue = (queryString: string): SignUpQueryStringValues => {
    const params = new URLSearchParams(queryString);
    const tokenParamValue = params.get(this.tokenIdentifier);
    return { token: tokenParamValue } as SignUpQueryStringValues;
  };
}

export const signUpQueryStringParser = new SignUpQueryStringParser();
