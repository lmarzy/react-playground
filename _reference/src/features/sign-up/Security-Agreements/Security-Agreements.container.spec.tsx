import {
  initialState,
  SecurityAgreementsContainerState,
  onDateOfBirthMatchFailureError,
  onAccountAlreadyExistsError,
  onMaxDateOfBirthAttemptsLimitError,
  onAccountCreationComplete,
  onAcceptTermsAndConditionsComplete,
  onToggleTermsDeclined,
  onToggleWhyCheckCredit,
  onHandleContactChoiceComplete,
  onHandleContactChoiceEmailChange,
  onHandleIdentitySectionComplete,
  onHandleToggleIdentityCheckError,
} from './Security-Agreements.container';
import { SignUpRoutes } from '../sign-up.routes';
import { Any } from '../../../shared/testing/any';

describe('Security Agreements Container', () => {
  let originalComponentState: SecurityAgreementsContainerState;

  beforeEach(() => {
    originalComponentState = { ...initialState };
  });

  describe('State changes', () => {
    it('account creation completed => sets accordion items and user state', () => {
      const userEmailAddress = Any.randomString();
      const userPassword = Any.randomString();

      const result = onAccountCreationComplete(userEmailAddress, userPassword, originalComponentState);

      expect(result.accordionItems.accountCreation.isActive).toBe(false);
      expect(result.accordionItems.accountCreation.isComplete).toBe(true);
      expect(result.accordionItems.terms.isActive).toBe(!originalComponentState.accordionItems.terms.isComplete);

      expect(result.user.email).toBe(userEmailAddress);
      expect(result.user.password).toBe(userPassword);
    });

    it('terms and conditions completed => sets accordion items', () => {
      const result = onAcceptTermsAndConditionsComplete(originalComponentState);

      expect(result.accordionItems.terms.isActive).toBe(false);
      expect(result.accordionItems.terms.isComplete).toBe(true);
      expect(result.accordionItems.contactChoices.isActive).toBe(
        !originalComponentState.accordionItems.contactChoices.isComplete,
      );
    });

    it('toggle decline terms and conditions => toggle previous value', () => {
      const result = onToggleTermsDeclined(originalComponentState);
      expect(result.termsDeclined).toBe(!originalComponentState.termsDeclined);
    });

    it('toggle why we check credit => toggle previous value', () => {
      const result = onToggleWhyCheckCredit(originalComponentState);
      expect(result.whyCreditCheck).toBe(!originalComponentState.whyCreditCheck);
    });

    it('contact preferences completed => sets accordion items and contact choices', () => {
      const phoneNumber = Any.randomString();
      const hasOptIntoMarketing = true;

      const result = onHandleContactChoiceComplete(phoneNumber, hasOptIntoMarketing, originalComponentState);

      expect(result.accordionItems.contactChoices.isActive).toBe(false);
      expect(result.accordionItems.contactChoices.isComplete).toBe(true);
      expect(result.accordionItems.identity.isActive).toBe(!originalComponentState.accordionItems.identity.isComplete);

      expect(result.contactChoices.optInToMarketing).toBe(hasOptIntoMarketing);
      expect(result.contactChoices.phoneNumber).toBe(phoneNumber);
    });

    it('contact preferences email checked => sets contact choice email address to users original value', () => {
      const emailIsChecked = true;
      const userEmail = originalComponentState.user.email;
      const result = onHandleContactChoiceEmailChange(emailIsChecked, originalComponentState);
      expect(result.contactChoices.emailAddress).toBe(userEmail);
    });

    it('contact preferences email unchecked => sets contact choice email address to null', () => {
      const emailIsChecked = false;
      const result = onHandleContactChoiceEmailChange(emailIsChecked, originalComponentState);
      expect(result.contactChoices.emailAddress).toBeNull();
    });

    it('identity section completed => sets accordion items and user date of birth', () => {
      const dateOfBirth = Any.randomString();
      const result = onHandleIdentitySectionComplete(dateOfBirth, originalComponentState);
      expect(result.accordionItems.identity.isActive).toBe(false);
      expect(result.accordionItems.identity.isComplete).toBe(true);
      expect(result.user.dateOfBirth).toBe(dateOfBirth);
    });

    it('identity reset error state => sets error state for identity from invalid to valid', () => {
      const result = onHandleToggleIdentityCheckError(originalComponentState);
      expect(result.errors.identity.dateOfBirthInvalid).toBe(false);
      expect(result.errors.identity.isInErroredState).toBe(false);
    });
  });

  describe('State changes from api error handling', () => {
    it('when date of birth match failure => sets accordion items and error state', () => {
      const result = onDateOfBirthMatchFailureError(originalComponentState);

      expect(result.accordionItems.identity.isActive).toBe(true);
      expect(result.accordionItems.identity.isComplete).toBe(false);

      expect(result.errors.identity.dateOfBirthInvalid).toBe(true);
      expect(result.errors.identity.isInErroredState).toBe(true);
    });

    it('when an account already exists for a user => sets accordion items and error state ', () => {
      const result = onAccountAlreadyExistsError(originalComponentState);

      expect(result.accordionItems.accountCreation.isActive).toBe(true);
      expect(result.accordionItems.accountCreation.isComplete).toBe(false);

      expect(result.errors.accountCreation.accountAlreadyExists).toBe(true);
      expect(result.errors.accountCreation.isInErroredState).toBe(true);
    });

    it('when a user reaches max identity check attempts => redirects to identity error page', () => {
      const historyApiMock = jest.fn(() => ({ push: jest.fn() }))();
      onMaxDateOfBirthAttemptsLimitError(historyApiMock);
      expect(historyApiMock.push).toBeCalledWith(SignUpRoutes.IdentityError);
    });
  });
});
