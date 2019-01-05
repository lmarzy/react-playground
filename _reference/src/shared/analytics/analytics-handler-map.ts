import * as ReactGA from 'react-ga';
import { AnalyticsActionType } from './analytics-event.model';

export type AnalyticsHandlerFunction = (category: string, label: string) => void;

export const analyticsHandlerMap = new Map<AnalyticsActionType, AnalyticsHandlerFunction>([
  [AnalyticsActionType.AccordionOpened, (category, label) => ReactGA.event({ category, label, action: 'Open' })],
  [AnalyticsActionType.CallToAction, (category, label) => ReactGA.event({ category, label, action: 'Call to action' })],
  [AnalyticsActionType.OnNavigation, (category, label) => ReactGA.event({ category, label, action: 'Navigation' })],
  [AnalyticsActionType.OnUserSelect, (category, label) => ReactGA.event({ category, label, action: 'Select' })],
  [AnalyticsActionType.VideoPlayed, (category, label) => ReactGA.event({ category, label, action: 'Play' })],
]);
