import { AnalyticsEvent, AnalyticsActionType } from '../../../shared/analytics';

const OpenBankingIntroPlayVideoEvent: AnalyticsEvent = {
  action: AnalyticsActionType.VideoPlayed,
  category: 'Open Banking',
  label: '7.1-play-video3',
};

const OpenBankingIntroWatchVideoNow: AnalyticsEvent = {
  action: AnalyticsActionType.CallToAction,
  category: 'Open Banking',
  label: '7.6-watch-now',
};

const OpenBankingIntroWatchVideoLater: AnalyticsEvent = {
  action: AnalyticsActionType.CallToAction,
  category: 'Open Banking',
  label: '7.7-watch-later',
};

const OpenBankingIntroWatchVideoWatched: AnalyticsEvent = {
  action: AnalyticsActionType.CallToAction,
  category: 'Open Banking',
  label: '7.8-video-watched',
};

const OpenBankingNavigationFast: AnalyticsEvent = {
  action: AnalyticsActionType.OnNavigation,
  category: 'Open Banking',
  label: '7.2-ob-accordion-1',
};

const OpenBankingNavigationSecure: AnalyticsEvent = {
  action: AnalyticsActionType.OnNavigation,
  category: 'Open Banking',
  label: '7.3-ob-accordion-2',
};

const OpenBankingNavigationPrivate: AnalyticsEvent = {
  action: AnalyticsActionType.OnNavigation,
  category: 'Open Banking',
  label: '7.4-ob-accordion-3',
};

const OpenBankingNavigationRegulated: AnalyticsEvent = {
  action: AnalyticsActionType.OnNavigation,
  category: 'Open Banking',
  label: '7.5-ob-accordion-4',
};

const OpenBankingConfirmJaModal: AnalyticsEvent = {
  action: AnalyticsActionType.CallToAction,
  category: 'Open Banking',
  label: '7.9-confirm-ja-modal',
};

export {
  OpenBankingIntroPlayVideoEvent,
  OpenBankingIntroWatchVideoNow,
  OpenBankingIntroWatchVideoLater,
  OpenBankingIntroWatchVideoWatched,
  OpenBankingNavigationFast,
  OpenBankingNavigationSecure,
  OpenBankingNavigationPrivate,
  OpenBankingNavigationRegulated,
  OpenBankingConfirmJaModal,
};
