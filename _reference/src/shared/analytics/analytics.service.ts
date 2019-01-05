import { Subject } from 'rxjs';
import { AnalyticsEvent } from './analytics-event.model';

class AnalyticsEventService {
  private eventsSubscription = new Subject<AnalyticsEvent>();
  events$ = this.eventsSubscription.asObservable();

  raiseEvent = (event: AnalyticsEvent): void => this.eventsSubscription.next(event);
}

export const analyticsEventService = new AnalyticsEventService();
