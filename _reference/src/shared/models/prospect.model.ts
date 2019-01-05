import { ReferrerModel } from './referrer.model';

export interface ProspectModel {
  firstName: string;
  lastName: string;
  email: string;
  telephoneNumber: string;
  referrer: ReferrerModel;
}
