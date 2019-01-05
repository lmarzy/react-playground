import { analyticsEventService, AnalyticsActionType, AnalyticsEvent } from '../../shared/analytics';

class SignUpAnalyticsService {
  private featureAnalyticsCategory = 'Sign Up';

  accordionOpened = (accordionId: string): void => {
    const event: AnalyticsEvent = {
      category: this.featureAnalyticsCategory,
      label: this.getLabelForAccordionOpenedEvent(accordionId),
      action: AnalyticsActionType.AccordionOpened,
    };
    analyticsEventService.raiseEvent(event);
  };

  private getLabelForAccordionOpenedEvent = (accordionId: string): string => {
    switch (accordionId) {
      case 'accountCreation':
        return '2.1-set-up-accordion';
      case 'terms':
        return '2.6-tcs-accordion';
      case 'contactChoices':
        return '2.11-contact-preferences-accordion';
      case 'identity':
        return '2.18-id-check-accordion';
      default:
        return 'Unknown category for accordionId';
    }
  };

  accountCreated = (): void => {
    const event: AnalyticsEvent = {
      category: this.featureAnalyticsCategory,
      label: '2.4.1-complete-set-up',
      action: AnalyticsActionType.AccordionOpened,
    };
    analyticsEventService.raiseEvent(event);
  };

  termsAndConditionsInfoClick = (): void => {
    const event: AnalyticsEvent = {
      category: this.featureAnalyticsCategory,
      label: '2.6-tcs-info-link',
      action: AnalyticsActionType.OnNavigation,
    };
    analyticsEventService.raiseEvent(event);
  };

  termsAndConditionsDeclined = (): void => {
    const event: AnalyticsEvent = {
      category: this.featureAnalyticsCategory,
      label: '2.7-decline',
      action: AnalyticsActionType.CallToAction,
    };
    analyticsEventService.raiseEvent(event);
  };

  termsAndConditionsAccepted = (): void => {
    const event: AnalyticsEvent = {
      category: this.featureAnalyticsCategory,
      label: '2.8-accept',
      action: AnalyticsActionType.CallToAction,
    };
    analyticsEventService.raiseEvent(event);
  };

  termsAndConditionsDeclinedGoToReferrer = (): void => {
    const event: AnalyticsEvent = {
      category: this.featureAnalyticsCategory,
      label: '2.9-return-to-referrer',
      action: AnalyticsActionType.CallToAction,
    };
    analyticsEventService.raiseEvent(event);
  };

  termsAndConditionsChangedMind = (): void => {
    const event: AnalyticsEvent = {
      category: this.featureAnalyticsCategory,
      label: '2.10-back',
      action: AnalyticsActionType.OnNavigation,
    };
    analyticsEventService.raiseEvent(event);
  };

  contactChoicesEmailSelectChange = (): void => {
    const event: AnalyticsEvent = {
      category: this.featureAnalyticsCategory,
      label: '2.12-select-email',
      action: AnalyticsActionType.OnUserSelect,
    };
    analyticsEventService.raiseEvent(event);
  };

  contactChoicesPhoneNumberSelectChange = (): void => {
    const event: AnalyticsEvent = {
      category: this.featureAnalyticsCategory,
      label: '2.13-select-phone',
      action: AnalyticsActionType.OnUserSelect,
    };
    analyticsEventService.raiseEvent(event);
  };

  contactChoicesOptInToMarketing = (): void => {
    const event: AnalyticsEvent = {
      category: this.featureAnalyticsCategory,
      label: '2.16-receive-marketing',
      action: AnalyticsActionType.OnUserSelect,
    };
    analyticsEventService.raiseEvent(event);
  };

  contactChoicesComplete = (): void => {
    const event: AnalyticsEvent = {
      category: this.featureAnalyticsCategory,
      label: '2.17-complete-contact-preferences',
      action: AnalyticsActionType.CallToAction,
    };
    analyticsEventService.raiseEvent(event);
  };

  identityValidateDateOfBirth = (): void => {
    const event: AnalyticsEvent = {
      category: this.featureAnalyticsCategory,
      label: '2.19-validate-dob',
      action: AnalyticsActionType.CallToAction,
    };
    analyticsEventService.raiseEvent(event);
  };

  identityWhyWeNeedYourDateOfBirthClick = (): void => {
    const event: AnalyticsEvent = {
      category: this.featureAnalyticsCategory,
      label: '2.20-id-info-link',
      action: AnalyticsActionType.OnNavigation,
    };
    analyticsEventService.raiseEvent(event);
  };

  identityDateOfBirthFailedErrorClick = (): void => {
    const event: AnalyticsEvent = {
      category: this.featureAnalyticsCategory,
      label: '2.21-error-text-link',
      action: AnalyticsActionType.OnNavigation,
    };
    analyticsEventService.raiseEvent(event);
  };

  identityDateOfBirthFailedGoToReferrer = (): void => {
    const event: AnalyticsEvent = {
      category: this.featureAnalyticsCategory,
      label: '2.22-return-to-referrer',
      action: AnalyticsActionType.CallToAction,
    };
    analyticsEventService.raiseEvent(event);
  };

  completeSignUp = (): void => {
    const event: AnalyticsEvent = {
      category: this.featureAnalyticsCategory,
      label: '2.23-complete-sign-up',
      action: AnalyticsActionType.CallToAction,
    };
    analyticsEventService.raiseEvent(event);
  };
}

export const signUpAnalyticsService = new SignUpAnalyticsService();
