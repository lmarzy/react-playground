import { AnalyticsEvent, AnalyticsActionType } from '../../../shared/analytics';

const Login: AnalyticsEvent = {
  action: AnalyticsActionType.CallToAction,
  category: 'Log in',
  label: '1.7-log-in',
};

export { Login };
