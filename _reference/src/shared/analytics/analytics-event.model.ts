export enum AnalyticsActionType {
  AccordionOpened,
  CallToAction,
  OnNavigation,
  OnUserSelect,
  VideoPlayed,
}

export interface AnalyticsEvent {
  action: AnalyticsActionType;
  category: string;
  label: string;
}
