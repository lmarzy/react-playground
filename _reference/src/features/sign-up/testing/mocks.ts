import { AxiosPromise } from 'axios';

import { SignUpUserStateModel } from '../models';

export const mocks = {
  queryStringParserMock: {
    prospectRefIdentifier: '',
    referrerRefIdentifier: '',
    getQueryStringValues(): any {
      return null;
    },
  },
  routerStoreMock: {
    routeHistory: [] as string[],
    currentUrl: '',
    get currentRoute(): string {
      return null;
    },
    set currentRoute(value: string) {},

    get showLanding(): boolean {
      return false;
    },

    get showAgreements(): boolean {
      return false;
    },

    get showProcess(): boolean {
      return false;
    },

    get showAllSet(): boolean {
      return false;
    },

    get showIdentityError(): boolean {
      return false;
    },

    goBack(): void {},

    goToRoute(route: string): void {},
  },
  uiStoreMock: {},
  domainStoreMock: {
    signUpStateModel: {},
    signupId: '',
    applicationErrored: false,
    identityCheckFailed: false,
    unableToConfimIdentity: false,
    showLoadingContent: true,
    signUpJourneyComplete: false,
    get allStepsComplete(): boolean {
      return false;
    },
    createNewUser(prospectRef: string, referrerRef: string): void {},
    recreateExistingUser(): void {},
    acceptTermsAndConditions(): void {},
    setContactPreferences(): void {},
    confirmIdentity(): void {},
    journeyEnd(): void {},
    completeSignUpJourney(): void {},
  },

  localStorageMockWrapper: () => new LocalStorageMockWrapper(),
};

export class LocalStorageMockWrapper {
  private store = {} as {
    [index: string]: string;
  };

  get storeMockInstance(): {} {
    return this.store;
  }

  configureSpys(): void {
    spyOn(localStorage, 'getItem').and.callFake(
      (key: string): string => {
        return this.store[key] || null;
      },
    );
    spyOn(localStorage, 'removeItem').and.callFake(
      (key: string): void => {
        delete this.store[key];
      },
    );
    spyOn(localStorage, 'setItem').and.callFake(
      (key: string, value: string): string => {
        return (this.store[key] = value);
      },
    );
    spyOn(localStorage, 'clear').and.callFake(() => {
      this.store = {};
    });
  }
}
