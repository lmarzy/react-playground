import { Subject } from 'rxjs';

export interface NewAnswerSelectedEvent {
  transactionId: string;
  answerCode: string; // Use type
}

class QuestionAnswerService {
  private eventsSubscription = new Subject<NewAnswerSelectedEvent>();
  events$ = this.eventsSubscription.asObservable();

  publishNewAnswerEvent = (event: NewAnswerSelectedEvent): void => this.eventsSubscription.next(event);
}

export const questionAnswerService = new QuestionAnswerService();
