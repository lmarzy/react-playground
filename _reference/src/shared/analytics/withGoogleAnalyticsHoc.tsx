import * as React from 'react';
import * as ReactGA from 'react-ga';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AnalyticsContext, AnalyticsContextDefaultValue } from './analytics-context';
import { analyticsHandlerMap } from './analytics-handler-map';
import { AnalyticsEvent } from './analytics-event.model';
import { analyticsEventService } from './analytics.service';

export const withGoogleAnalyticsHoc = <TProps extends object>(UnwrappedComponent: React.ComponentType<TProps>) =>
  class extends React.Component<TProps> {
    private destroy$: Subject<AnalyticsEvent> = new Subject<AnalyticsEvent>();

    componentWillMount(): void {
      ReactGA.initialize(process.env.GA_ACCOUNT_ID, { debug: Boolean(process.env.USE_DEBUG) });

      analyticsEventService.events$.pipe(takeUntil(this.destroy$)).subscribe(event => {
        analyticsHandlerMap.get(event.action)(event.category, event.label);
      });
    }

    componentWillUnmount(): void {
      this.destroy$.next();

      if (this.destroy$ !== null) {
        this.destroy$.unsubscribe();
      }
    }

    render(): React.ReactNode {
      return (
        <AnalyticsContext.Provider value={AnalyticsContextDefaultValue}>
          <UnwrappedComponent {...this.props} />
        </AnalyticsContext.Provider>
      );
    }
  };
