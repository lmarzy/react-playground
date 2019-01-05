import * as React from 'react';

import { analyticsHandlerMap } from './analytics-handler-map';
import { AnalyticsActionType } from './analytics-event.model';

export const AnalyticsContextDefaultValue = {
  callToAction: analyticsHandlerMap.get(AnalyticsActionType.CallToAction),
  navigation: analyticsHandlerMap.get(AnalyticsActionType.OnNavigation),
  open: analyticsHandlerMap.get(AnalyticsActionType.AccordionOpened),
  play: analyticsHandlerMap.get(AnalyticsActionType.VideoPlayed),
  select: analyticsHandlerMap.get(AnalyticsActionType.OnUserSelect),
};

export const AnalyticsContext = React.createContext(AnalyticsContextDefaultValue);
export const AnalyticsContextConsumer = AnalyticsContext.Consumer;
