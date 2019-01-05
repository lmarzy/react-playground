import { analyticsEventService, AnalyticsActionType, AnalyticsEvent } from '../../shared/analytics';

class OnboardingAnalyticsService {
  private aboutYouFeatureAnalyticsCategory = 'About You';
  private accessAndEstablisAnalyticsCategory = 'Access and establish';

  aboutYouConfirmPartner = (): void => {
    const event: AnalyticsEvent = {
      category: this.aboutYouFeatureAnalyticsCategory,
      label: '5.2-confirm-partner',
      action: AnalyticsActionType.OnUserSelect,
    };
    analyticsEventService.raiseEvent(event);
  };

  aboutYouConfirmHouseholdBreakdown = (): void => {
    const event: AnalyticsEvent = {
      category: this.aboutYouFeatureAnalyticsCategory,
      label: '5.3-confirm-hh-breakdown',
      action: AnalyticsActionType.CallToAction,
    };
    analyticsEventService.raiseEvent(event);
  };

  accessAndEstablishVulnerabilitiesSelected = (vulnerabilityDescriptions: string[]): void => {
    vulnerabilityDescriptions.forEach(desc => {
      const event: AnalyticsEvent = {
        category: this.accessAndEstablisAnalyticsCategory,
        label: `6.1-${desc.split(' ').join('-')}`,
        action: AnalyticsActionType.OnUserSelect,
      };
      analyticsEventService.raiseEvent(event);
    });
  };

  accessAndEstablishWhyWeAskYouThisLink = (): void => {
    const event: AnalyticsEvent = {
      category: this.accessAndEstablisAnalyticsCategory,
      label: '6.13-access-info-link',
      action: AnalyticsActionType.OnNavigation,
    };
    analyticsEventService.raiseEvent(event);
  };

  accessAndEstablishConfirmed = (): void => {
    const event: AnalyticsEvent = {
      category: this.accessAndEstablisAnalyticsCategory,
      label: '6.15-access-confirm',
      action: AnalyticsActionType.CallToAction,
    };
    analyticsEventService.raiseEvent(event);
  };

  accessAndEstablishSkipPersonalCircumstances = (): void => {
    const event: AnalyticsEvent = {
      category: this.accessAndEstablisAnalyticsCategory,
      label: '6.14-access-skip',
      action: AnalyticsActionType.OnNavigation,
    };
    analyticsEventService.raiseEvent(event);
  };
}

export const onboardingAnalyticsService = new OnboardingAnalyticsService();
